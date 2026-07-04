import Phaser from 'phaser'

const A = '/images/game_assets'
const BASE_SPEED = 300
const MAX_SPEED = 680

// The world has two ground surfaces:
//   • Front lane  – the clean stone-grass strip the player runs on. No decor.
//   • Back terrace – a second surface raised behind the lane, carrying ALL the
//     decoration. It drifts slower (parallax) and reads as hazier/further back.
const BACK_PARALLAX = 0.72

// Surface decorations (visual only, never collide). They all live on the back
// terrace, never on the play lane. Chosen to be visually distinct from the
// obstacle set (log stump, flowering cactus, drone) so players never mistake
// decoration for a hazard.
//
// *_trim.png = source art cropped to its visible alpha bounds. The raw source
// PNGs carry 5-30% of transparent padding (mostly at the bottom), so bottom-
// anchoring the untrimmed art left every plant/rock hovering above the grass
// line instead of standing on it.
const SMALL_DECOR = [
  { key: 'dec-grass-1', file: 'grass_small_1_trim.png', hMin: 26, hMax: 40, weight: 4 },
  { key: 'dec-grass-2', file: 'grass_small_2_trim.png', hMin: 26, hMax: 40, weight: 4 },
  { key: 'dec-grass-3', file: 'grass_small_3_trim.png', hMin: 26, hMax: 40, weight: 4 },
  { key: 'dec-grass-med', file: 'grass_medium_1_trim.png', hMin: 34, hMax: 48, weight: 3 },
  { key: 'dec-grass-flower-1', file: 'grass_with_flower_1_trim.png', hMin: 36, hMax: 52, weight: 3 },
  { key: 'dec-grass-flower-2', file: 'grass_with_flower_2_trim.png', hMin: 36, hMax: 52, weight: 3 },
  { key: 'dec-flower-1', file: 'flower_1_trim.png', hMin: 30, hMax: 44, weight: 2 },
  { key: 'dec-flower-2', file: 'flower_2_trim.png', hMin: 36, hMax: 54, weight: 2 },
  { key: 'dec-flower-3', file: 'flower_5_trim.png', hMin: 30, hMax: 44, weight: 2 },
  { key: 'dec-bush-purple-1', file: 'flower_bush_purple_1_trim.png', hMin: 46, hMax: 66, weight: 2 },
  { key: 'dec-bush-purple-2', file: 'flower_bush_purple_2_trim.png', hMin: 46, hMax: 66, weight: 2 },
  { key: 'dec-bush-green', file: 'flower_bush_green_trim.png', hMin: 42, hMax: 58, weight: 2 },
  { key: 'dec-rock-1', file: 'rocks_small_1_trim.png', hMin: 24, hMax: 38, weight: 2 },
  { key: 'dec-rock-2', file: 'rocks_small_2_trim.png', hMin: 24, hMax: 38, weight: 2 },
]
const TREE_DECOR = [
  { key: 'dec-tree-large', file: 'tree_large_trim.png', hMin: 250, hMax: 310 },
  { key: 'dec-tree-medium', file: 'tree_medium_trim.png', hMin: 190, hMax: 240 },
]

export class GameScene extends Phaser.Scene {
  // Background layer (far sky panorama; the two source arts alternate)
  private bgFar!: Phaser.GameObjects.TileSprite

  // Front play surface (scrolling stone-grass blocks the player runs on)
  private groundBlocks: Phaser.GameObjects.Image[] = []
  private groundStep = 0

  // Back terrace (raised decorated surface behind the play lane)
  private backBlocks: Phaser.GameObjects.Image[] = []
  private backStep = 0
  private backGroundY = 0

  // Surface decorations (all sit on the back terrace, purely visual)
  private decors: Phaser.GameObjects.Image[] = []

  // Physics
  private player!: Phaser.Physics.Arcade.Image
  private obstacles!: Phaser.Physics.Arcade.Group
  private crystals!: Phaser.Physics.Arcade.Group
  private groundBody!: Phaser.GameObjects.Rectangle

  // State
  private groundY = 0
  private gameSpeed = BASE_SPEED
  private distScore = 0
  private gemScore = 0
  private lives = 3
  private jumpCount = 0
  private isStarted = false
  private isGameOver = false
  private isInvincible = false

  // UI
  private scoreText!: Phaser.GameObjects.Text
  private hearts: Phaser.GameObjects.Image[] = []
  private startOverlay!: Phaser.GameObjects.Container

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    // far_back_pair.webp = far_back-1 + far_back-2 stitched into one seamless
    // strip, so tiling shows the two artworks alternating endlessly.
    this.load.image('bg-far', `${A}/background_layer/far_back_pair.webp`)
    this.load.image('ground-block', `${A}/environment/stone_grass_horizontal_platform_1.png`)
    this.load.image('player', `${A}/ui/player_profile_pic.png`)
    this.load.image('cactus', `${A}/obstacles/obstacles_cactus.png`)
    this.load.image('drone', `${A}/obstacles/obstacles_drone.png`)
    this.load.image('tree-obs', `${A}/obstacles/obstacles_tree.png`)
    this.load.image('coin', `${A}/collectibles/collectibles_coin.png`)
    this.load.image('crystal', `${A}/collectibles/collectibles_stone.png`)
    this.load.image('heart', `${A}/ui/heart_big.png`)
    this.load.image('star', `${A}/effects/effects_golden_star.png`)

    for (const d of [...SMALL_DECOR, ...TREE_DECOR]) {
      this.load.image(d.key, `${A}/environment/${d.file}`)
    }
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height

    // Reset all mutable state (scene.restart() calls create again)
    this.gameSpeed = BASE_SPEED
    this.distScore = 0
    this.gemScore = 0
    this.lives = 3
    this.jumpCount = 0
    this.isStarted = false
    this.isGameOver = false
    this.isInvincible = false
    this.hearts = []
    this.groundBlocks = []
    this.backBlocks = []
    this.decors = []

    // Front play line sits at 80% height (closer camera, like the reference).
    // The back terrace is raised ~70px above it to form a decorated ledge.
    this.groundY = Math.round(H * 0.8)
    this.backGroundY = this.groundY - 70

    // --- Background ---
    // Far sky panorama stretched to cover the whole canvas. The texture holds
    // both artworks back-to-back, so scrolling plays 1 → 2 → 1 → 2 …
    const farTexH = this.textures.get('bg-far').getSourceImage().height
    const farScale = H / farTexH
    this.bgFar = this.add.tileSprite(0, 0, W, H, 'bg-far')
      .setOrigin(0, 0)
      .setTileScale(farScale, farScale)

    // --- Back terrace: decorated surface behind the play lane ---
    this.buildBackGround(W)

    // Dress the terrace across the first screen before the run starts.
    let decorX = 30
    while (decorX < W) {
      this.spawnSmallDecor(decorX)
      decorX += Phaser.Math.Between(70, 150)
    }
    this.spawnTreeDecor(W * Phaser.Math.FloatBetween(0.15, 0.3))
    this.spawnTreeDecor(W * Phaser.Math.FloatBetween(0.65, 0.85))

    // --- Front play surface: clean stone-grass blocks (no decoration) ---
    this.buildGround(W)

    // --- Invisible ground physics platform ---
    // Sits ~8px below groundY so the player's feet plant into the visible
    // stone-grass surface instead of hovering above it.
    this.groundBody = this.add.rectangle(W / 2, this.groundY + 12, W, 8, 0x000000, 0)
    this.physics.add.existing(this.groundBody, true)

    // --- Obstacle & crystal groups ---
    this.obstacles = this.physics.add.group()
    this.crystals = this.physics.add.group()

    // --- Player (profile pic as character) ---
    const playerDisplayH = 126
    const playerScale = playerDisplayH / 226 // native: 243×226
    const playerY = this.groundY - playerDisplayH / 2 + 10

    this.player = this.physics.add.image(150, playerY, 'player')
    this.player.setScale(playerScale)
    this.player.setCollideWorldBounds(true)
    ;(this.player.body as Phaser.Physics.Arcade.Body).setGravityY(950)
    ;(this.player.body as Phaser.Physics.Arcade.Body).setMaxVelocityY(1100)
    // Body in texture-space pixels (body_world = texPx * scale)
    this.player.setBodySize(200, 210, true)
    this.player.setDepth(5)

    // Colliders
    this.physics.add.collider(this.player, this.groundBody)
    this.physics.add.collider(this.obstacles, this.groundBody)

    this.physics.add.overlap(
      this.player, this.obstacles,
      this.onHitObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined, this
    )
    this.physics.add.overlap(
      this.player, this.crystals,
      this.onCollectGem as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined, this
    )

    // --- HUD ---
    this.buildHUD(W)

    // --- Input ---
    this.input.keyboard!.on('keydown-SPACE', this.onInputJump, this)
    this.input.keyboard!.on('keydown-UP', this.onInputJump, this)
    this.input.on('pointerdown', this.onInputJump, this)

    // --- Start screen ---
    this.showStartScreen(W, H)
  }

  // ─── Ground ─────────────────────────────────────────────────────────────────

  // The stone-grass texture has transparent padding + sparse grass tips above
  // its dense grass surface (row 38 of 265). Anchoring that surface line to the
  // target ground Y makes feet, obstacles and decorations sit IN the grass.
  private readonly GROUND_TEX_W = 365
  private readonly GROUND_TEX_H = 265
  private readonly GRASS_SURFACE_ROW = 38

  // Front play surface. Blocks slightly overlap so the rounded left/right edges
  // tuck into each other and look continuous.
  private buildGround(W: number) {
    const displayH = 170
    const scale = displayH / this.GROUND_TEX_H
    const step = this.GROUND_TEX_W * scale * 0.88 // 12% overlap hides seams
    this.groundStep = step

    const y = this.groundY - Math.round(displayH * this.GRASS_SURFACE_ROW / this.GROUND_TEX_H)
    const count = Math.ceil(W / step) + 2

    for (let i = 0; i < count; i++) {
      const b = this.add.image(i * step, y, 'ground-block')
        .setOrigin(0, 0)
        .setScale(scale)
        .setDepth(3)
      this.groundBlocks.push(b)
    }
  }

  // Back terrace: a second stone-grass surface, raised and slightly smaller so
  // it reads as further back. Reduced alpha lets the pale sky bleed through for
  // an atmospheric-haze feel. Its lower body is hidden behind the front lane
  // (depth 3), leaving a decorated grass ledge peeking above the play line.
  private buildBackGround(W: number) {
    const displayH = 138
    const scale = displayH / this.GROUND_TEX_H
    const step = this.GROUND_TEX_W * scale * 0.88
    this.backStep = step

    const y = this.backGroundY - Math.round(displayH * this.GRASS_SURFACE_ROW / this.GROUND_TEX_H)
    const count = Math.ceil(W / step) + 2

    for (let i = 0; i < count; i++) {
      const b = this.add.image(i * step, y, 'ground-block')
        .setOrigin(0, 0)
        .setScale(scale)
        .setDepth(1)
        .setAlpha(0.9)
      this.backBlocks.push(b)
    }
  }

  // ─── HUD ────────────────────────────────────────────────────────────────────

  private buildHUD(W: number) {
    // Score (top-right)
    this.scoreText = this.add.text(W - 14, 10, '0', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#1a0a2e',
      strokeThickness: 6,
    }).setOrigin(1, 0).setDepth(50)

    this.add.text(W - 14, 37, 'SCORE', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: '10px',
      color: 'rgba(255,255,255,0.55)',
      letterSpacing: 2,
    }).setOrigin(1, 0).setDepth(50)

    // Hearts (top-left)
    for (let i = 0; i < 3; i++) {
      const h = this.add.image(14 + i * 42, 14, 'heart')
        .setScale(0.3)
        .setOrigin(0, 0)
        .setDepth(50)
      this.hearts.push(h)
    }
  }

  // ─── Start screen ────────────────────────────────────────────────────────────

  private showStartScreen(W: number, H: number) {
    const overlay = this.add.rectangle(W / 2, H / 2, W, H, 0x1a0a2e, 0.75)
    const title = this.add.text(W / 2, H / 2 - 32, 'THE BIG3 RUNNER', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: Math.round(W / 22) + 'px',
      fontStyle: 'bold',
      color: '#e4d8eb',
      stroke: '#3d1a6e',
      strokeThickness: 7,
    }).setOrigin(0.5)

    const sub = this.add.text(W / 2, H / 2 + 18, '▶  SPACE  or  TAP  to  play', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: '14px',
      color: '#c9a8e2',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: sub,
      alpha: 0.35,
      duration: 750,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.startOverlay = this.add.container(0, 0, [overlay, title, sub]).setDepth(100)
  }

  // ─── Game start ──────────────────────────────────────────────────────────────

  private beginGame() {
    if (this.isStarted || this.isGameOver) return
    this.isStarted = true

    this.tweens.add({
      targets: this.startOverlay,
      alpha: 0,
      duration: 280,
      onComplete: () => this.startOverlay.destroy(),
    })

    this.queueNextObstacle()
    this.queueDecor()
    this.queueTreeDecor()

    // Speed ramp every 7 seconds
    this.time.addEvent({
      delay: 7000,
      loop: true,
      callback: () => {
        this.gameSpeed = Math.min(this.gameSpeed + 26, MAX_SPEED)
      },
    })
  }

  // ─── Surface decorations (visual only, no physics) ──────────────────────────

  // All decorations live on the back terrace at depth 2: above the terrace
  // blocks (depth 1) but behind the front lane (depth 3), so their bases tuck
  // onto the ledge and they never read as lane hazards. Slight transparency
  // matches the terrace's atmospheric haze.
  private addDecorImage(key: string, dispH: number, x: number, y: number) {
    const texH = this.textures.get(key).getSourceImage().height
    const img = this.add.image(x, y, key)
      .setOrigin(0.5, 1)
      .setScale(dispH / texH)
      .setDepth(2)
      .setAlpha(0.92)
    this.decors.push(img)
  }

  private spawnSmallDecor(x: number) {
    const total = SMALL_DECOR.reduce((sum, d) => sum + d.weight, 0)
    let r = Math.random() * total
    let pick = SMALL_DECOR[0]
    for (const d of SMALL_DECOR) {
      r -= d.weight
      if (r <= 0) { pick = d; break }
    }
    const h = Phaser.Math.Between(pick.hMin, pick.hMax)
    // Bottom-anchored a few px into the terrace grass so stems look planted.
    this.addDecorImage(pick.key, h, x, this.backGroundY + Phaser.Math.Between(2, 10))
  }

  private spawnTreeDecor(x: number) {
    const pick = TREE_DECOR[Math.random() < 0.6 ? 0 : 1]
    const h = Phaser.Math.Between(pick.hMin, pick.hMax)
    this.addDecorImage(pick.key, h, x, this.backGroundY + 14)
  }

  private queueDecor() {
    if (this.isGameOver) return
    this.time.delayedCall(Phaser.Math.Between(260, 650), () => {
      if (this.isGameOver) return
      this.spawnSmallDecor(this.scale.width + 80)
      this.queueDecor()
    }, [], this)
  }

  private queueTreeDecor() {
    if (this.isGameOver) return
    this.time.delayedCall(Phaser.Math.Between(6000, 12000), () => {
      if (this.isGameOver) return
      this.spawnTreeDecor(this.scale.width + 200)
      this.queueTreeDecor()
    }, [], this)
  }

  // ─── Obstacle / crystal spawning ─────────────────────────────────────────────

  private queueNextObstacle() {
    if (this.isGameOver) return
    const delay = Phaser.Math.Between(1300, 2700)
    this.time.delayedCall(delay, () => {
      if (this.isGameOver) return
      this.spawnObstacle()
      if (Math.random() > 0.42) {
        this.time.delayedCall(Phaser.Math.Between(250, 700), this.spawnGem, [], this)
      }
      this.queueNextObstacle()
    }, [], this)
  }

  private spawnObstacle() {
    const W = this.scale.width
    const gY = this.groundY
    const r = Math.random()

    let key: string, dispH: number, texH: number, texW: number, yPos: number, bodyFracW: number, bodyFracH: number

    if (r < 0.42) {
      // Cactus – ground obstacle
      key = 'cactus'; texH = 520; texW = 432; dispH = 120
      yPos = gY - dispH / 2 + 14
      bodyFracW = 0.38; bodyFracH = 0.78
    } else if (r < 0.68) {
      // Drone – aerial
      key = 'drone'; texH = 388; texW = 548; dispH = 82
      yPos = gY - Phaser.Math.Between(190, 280)
      bodyFracW = 0.65; bodyFracH = 0.55
    } else {
      // Log stump – taller ground obstacle
      key = 'tree-obs'; texH = 487; texW = 512; dispH = 140
      yPos = gY - dispH / 2 + 18
      bodyFracW = 0.42; bodyFracH = 0.82
    }

    const scale = dispH / texH
    const obs = this.obstacles.create(W + 160, yPos, key) as Phaser.Physics.Arcade.Image
    obs.setScale(scale)
    obs.setImmovable(true)
    ;(obs.body as Phaser.Physics.Arcade.Body).setAllowGravity(false)
    ;(obs.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.gameSpeed)
    // setBodySize expects texture-space pixels
    obs.setBodySize(texW * bodyFracW, texH * bodyFracH, true)
    obs.setDepth(6)
  }

  private spawnGem() {
    const W = this.scale.width
    const yPos = this.groundY - Phaser.Math.Between(90, 230)
    const key = Math.random() > 0.5 ? 'coin' : 'crystal'
    // coin: 148×217, crystal: 153×225
    const texH = key === 'coin' ? 217 : 225
    const dispH = 60
    const scale = dispH / texH

    const gem = this.crystals.create(W + 120, yPos, key) as Phaser.Physics.Arcade.Image
    gem.setScale(scale)
    ;(gem.body as Phaser.Physics.Arcade.Body).setAllowGravity(false)
    ;(gem.body as Phaser.Physics.Arcade.Body).setVelocityX(-this.gameSpeed)
    gem.setBodySize(100, 150, true)
    gem.setDepth(6)

    this.tweens.add({
      targets: gem,
      y: yPos - 20,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  // ─── Input ───────────────────────────────────────────────────────────────────

  private onInputJump = () => {
    if (this.isGameOver) return
    if (!this.isStarted) {
      this.beginGame()
      // fall through to also do the first jump
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body

    if (body.blocked.down) {
      body.setVelocityY(-700)
      this.jumpCount = 1
      // Pixar squish-and-stretch on jump
      this.tweens.add({
        targets: this.player,
        scaleX: this.player.scaleX * 1.18,
        scaleY: this.player.scaleY * 0.72,
        duration: 75,
        yoyo: true,
        ease: 'Quad.easeOut',
      })
    } else if (this.jumpCount < 2) {
      body.setVelocityY(-580)
      this.jumpCount = 2
      this.tweens.add({
        targets: this.player,
        scaleX: this.player.scaleX * 1.12,
        scaleY: this.player.scaleY * 0.85,
        duration: 60,
        yoyo: true,
      })
    }
  }

  // ─── Collision handlers ───────────────────────────────────────────────────────

  private onHitObstacle = (
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obstacle: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) => {
    if (this.isInvincible) return
    this.isInvincible = true
    ;(obstacle as Phaser.GameObjects.Image).destroy()

    this.lives--
    this.hearts[this.lives]?.setAlpha(0.15)

    if (this.lives <= 0) {
      this.doGameOver()
      return
    }

    // 2-second invincibility flash
    this.tweens.add({
      targets: this.player,
      alpha: 0.25,
      duration: 110,
      yoyo: true,
      repeat: 8,
      onComplete: () => {
        this.player.setAlpha(1)
        this.isInvincible = false
      },
    })
  }

  private onCollectGem = (
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    gemObj: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) => {
    const gem = gemObj as Phaser.Physics.Arcade.Image
    // Disable physics body immediately, keep visual for pop tween
    gem.disableBody(false, false)

    this.gemScore += 10
    this.scoreText.setText(this.totalScore().toString())

    // Float-up pop
    this.tweens.add({
      targets: gem,
      y: gem.y - 45,
      alpha: 0,
      scaleX: gem.scaleX * 1.4,
      scaleY: gem.scaleY * 1.4,
      duration: 380,
      ease: 'Quad.easeOut',
      onComplete: () => gem.destroy(),
    })

    // Score pulse
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.25,
      scaleY: 1.25,
      duration: 90,
      yoyo: true,
    })
  }

  // ─── Game over ───────────────────────────────────────────────────────────────

  private doGameOver() {
    this.isGameOver = true
    ;(this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0)

    // Freeze everything
    for (const c of [...this.obstacles.getChildren(), ...this.crystals.getChildren()]) {
      ;(c as Phaser.Physics.Arcade.Image).setVelocityX(0)
    }

    // Camera shake
    this.cameras.main.shake(350, 0.018)

    const W = this.scale.width
    const H = this.scale.height
    const final = this.totalScore()

    const overlay = this.add.rectangle(W / 2, H / 2, W, H, 0x1a0a2e, 0.82).setDepth(200)

    this.add.text(W / 2, H / 2 - 44, 'GAME OVER', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: Math.round(W / 16) + 'px',
      fontStyle: 'bold',
      color: '#e4d8eb',
      stroke: '#7b2d8b',
      strokeThickness: 8,
    }).setOrigin(0.5).setDepth(201)

    this.add.text(W / 2, H / 2 + 4, `Score: ${final}`, {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: '20px',
      color: '#c9a8e2',
    }).setOrigin(0.5).setDepth(201)

    const btn = this.add.text(W / 2, H / 2 + 46, '▶  PLAY AGAIN', {
      fontFamily: 'system-ui, Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#7b2d8b',
      padding: { x: 18, y: 9 },
    }).setOrigin(0.5).setDepth(201).setInteractive({ useHandCursor: true })

    this.tweens.add({ targets: btn, alpha: 0.45, duration: 580, yoyo: true, repeat: -1 })

    btn.on('pointerdown', () => this.scene.restart())
    this.time.delayedCall(400, () => {
      this.input.keyboard!.once('keydown-SPACE', () => this.scene.restart())
    })
  }

  // ─── Update ──────────────────────────────────────────────────────────────────

  update(_time: number, delta: number) {
    if (!this.isStarted || this.isGameOver) return

    const dt = delta / 1000

    // Background scroll – a slow fraction of game speed for depth.
    // tilePositionX is in texture pixels, so divide by tileScaleX to make the
    // fraction describe on-screen speed regardless of texture scale.
    this.bgFar.tilePositionX += (this.gameSpeed * 0.07 * dt) / this.bgFar.tileScaleX

    // Front lane scroll – full game speed (foreground the player runs on)
    const totalGround = this.groundStep * this.groundBlocks.length
    for (const b of this.groundBlocks) {
      b.x -= this.gameSpeed * dt
      // Wrap a block to the right end once its right edge leaves the screen
      if (b.x + b.displayWidth < 0) b.x += totalGround
    }

    // Back terrace scroll – slower parallax; its blocks and decorations move
    // together so the dressing stays planted on the ledge.
    const backSpeed = this.gameSpeed * BACK_PARALLAX
    const totalBack = this.backStep * this.backBlocks.length
    for (const b of this.backBlocks) {
      b.x -= backSpeed * dt
      if (b.x + b.displayWidth < 0) b.x += totalBack
    }

    // Decorations ride the terrace, culled once fully off-screen (trees are
    // wide, so the margin is generous).
    for (let i = this.decors.length - 1; i >= 0; i--) {
      const d = this.decors[i]
      d.x -= backSpeed * dt
      if (d.x < -400) {
        d.destroy()
        this.decors.splice(i, 1)
      }
    }

    // Distance score (runs at 60fps target)
    this.distScore++
    if (this.distScore % 6 === 0) {
      this.scoreText.setText(this.totalScore().toString())
    }

    // Reset double-jump when grounded
    const body = this.player.body as Phaser.Physics.Arcade.Body
    if (body.blocked.down) this.jumpCount = 0

    // Cull off-screen objects
    for (const c of [...this.obstacles.getChildren(), ...this.crystals.getChildren()]) {
      const img = c as Phaser.Physics.Arcade.Image
      if (img.x < -320) img.destroy()
    }
  }

  private totalScore(): number {
    return Math.floor(this.distScore / 6) * 5 + this.gemScore
  }
}
