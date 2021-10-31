import Phaser from "phaser"
import { degreesToRadians } from "./utils/rotation"
import { Vector } from "./Vector"

export class Ship {
  container: Phaser.GameObjects.Container
  sprite: Phaser.GameObjects.Sprite
  thrust: Phaser.GameObjects.Sprite
  cursors: Phaser.Types.Input.Keyboard.CursorKeys

  velocity = Vector.Zero()
  acceleration = Vector.Zero()

  get x() {
    return this.container.x
  }

  get y() {
    return this.container.y
  }

  get rotation() {
    return this.container.rotation
  }

  constructor(private scene: Phaser.Scene) {}

  create() {
    const canvasWidth = this.scene.game.canvas.width
    const canvasHeight = this.scene.game.canvas.height

    this.container = this.scene.add.container(
      canvasWidth * 0.5,
      canvasHeight * 0.5
    )

    this.thrust = this.scene.add.sprite(-32, 0, "thrust")
    this.thrust.scale = 0.5
    this.thrust.alpha = 0

    this.sprite = this.scene.add.sprite(0, 0, "ship")

    this.container.add([this.thrust, this.sprite])
    this.container.rotation = degreesToRadians(-90)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
  }

  update(t: number, d: number) {
    this.handleMovement()
  }

  handleMovement() {
    if (this.cursors.right.isDown) {
      this.container.rotation += 0.1
    }

    if (this.cursors.left.isDown) {
      this.container.rotation -= 0.1
    }

    if (this.cursors.up.isDown) {
      const rotx = Math.cos(this.container.rotation)
      const roty = Math.sin(this.container.rotation)
      const acc = new Vector(rotx, roty).multiply(0.2)
      this.acceleration = this.acceleration.add(acc)
      this.thrust.alpha = 1
    } else {
      this.thrust.alpha = 0
    }

    this.velocity = this.velocity.add(this.acceleration)
    this.container.x += this.velocity.x
    this.container.y += this.velocity.y

    this.acceleration = Vector.Zero()

    // Deceleration
    if (this.velocity.y < 0 || this.velocity.y > 0) {
      this.velocity.y -= this.velocity.y * 0.01
    }

    if (this.velocity.x < 0 || this.velocity.x > 0) {
      this.velocity.x -= this.velocity.x * 0.01
    }

    // Wrap Around
    const wrapThreshold = 16

    if (this.container.y < -wrapThreshold) {
      this.container.y = this.scene.game.canvas.height
    }

    if (this.container.y > this.scene.game.canvas.height + wrapThreshold) {
      this.container.y = -wrapThreshold
    }

    if (this.container.x < -wrapThreshold) {
      this.container.x = this.scene.game.canvas.width
    }

    if (this.container.x > this.scene.game.canvas.width + wrapThreshold) {
      this.container.x = -wrapThreshold
    }
  }
}
