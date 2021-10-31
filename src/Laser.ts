import Phaser from "phaser"
import { Vector } from "./Vector"

export class Laser {
  sprite: Phaser.GameObjects.Sprite
  velocity: Vector

  constructor(scene: Phaser.Scene, x: number, y: number, rotation: number) {
    this.sprite = scene.add.sprite(x, y, "laser")
    this.sprite.scale = 0.5
    this.sprite.rotation = rotation

    const velocityX = Math.cos(rotation)
    const velocityY = Math.sin(rotation)
    this.velocity = new Vector(velocityX, velocityY).multiply(16)
  }

  update(t: number, d: number) {
    this.sprite.x += this.velocity.x
    this.sprite.y += this.velocity.y
  }

  destroy() {
    this.sprite.destroy()
  }
}
