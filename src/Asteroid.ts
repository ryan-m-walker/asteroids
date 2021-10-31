import Phaser from "phaser"
import { getRandomBool, getRandomFloat, getRandomInt } from "./utils/random"
import { degreesToRadians } from "./utils/rotation"
import { Vector } from "./Vector"

export enum AsteroidSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export type AsteroidConfig = {
  position: Vector
  size: AsteroidSize
  velocity: Vector
}

export class Asteroid {
  sprite: Phaser.GameObjects.Sprite
  velocity: Vector
  size: AsteroidSize

  constructor(private scene: Phaser.Scene, config: AsteroidConfig) {
    this.sprite = this.scene.add.sprite(
      config.position.x,
      config.position.y,
      getRandomBool() ? "asteroidBig1" : "asteroidBig2"
    )
    this.size = config.size
    this.sprite.rotation = degreesToRadians(getRandomInt(0, 360))
    this.sprite.scale = this.getScale()
    this.velocity = config.velocity
  }

  update(t: number, d: number) {
    this.sprite.x += this.velocity.x
    this.sprite.y += this.velocity.y

    const halfSize = this.sprite.width * 0.5 * this.getScale()
    const canvasWidth = this.scene.game.canvas.width
    const canvasHeight = this.scene.game.canvas.height

    console.log(halfSize)

    if (this.sprite.x < 0 - halfSize) {
      this.sprite.x = canvasWidth + halfSize
    }

    if (this.sprite.x > canvasWidth + halfSize) {
      this.sprite.x = -halfSize
    }

    if (this.sprite.y < 0 - halfSize) {
      this.sprite.y = canvasHeight + halfSize
    }

    if (this.sprite.y > canvasHeight + halfSize) {
      this.sprite.y = -halfSize
    }
  }

  private getScale() {
    switch (this.size) {
      case AsteroidSize.LARGE:
        return 1.5
      case AsteroidSize.MEDIUM:
        return 1
      default:
        return 0.5
    }
  }
}
