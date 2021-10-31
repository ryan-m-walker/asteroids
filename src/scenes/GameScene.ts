import { Vector } from "../Vector"
import Phaser, { Input } from "phaser"
import { degreesToRadians } from "../utils/rotation"
import { Ship } from "../Ship"
import { Laser } from "../Laser"
import { Asteroid, AsteroidSize } from "../Asteroid"
import { getRandomFloat, getRandomInt } from "../utils/random"

export class GameScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  ship = new Ship(this)
  lasers: Laser[] = []
  asteroids: Asteroid[] = []

  preload() {
    this.load.image("ship", "sprites/ship.png")
    this.load.image("laser", "sprites/laser.png")
    this.load.image("thrust", "sprites/thrust.png")
    this.load.image("asteroidBig1", "sprites/asteroidBig1.png")
    this.load.image("asteroidBig2", "sprites/asteroidBig2.png")
  }

  create() {
    this.ship.create()
    this.cursors = this.input.keyboard.createCursorKeys()
    this.asteroids = [
      this.getRandomAsteroid(),
      this.getRandomAsteroid(),
      this.getRandomAsteroid(),
    ]
  }

  update(t: number, d: number) {
    this.ship.update(t, d)
    this.handleLasers(t, d)
    this.handleAsteroids(t, d)
  }

  private handleLasers(t: number, d: number) {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      const [x, y] = this.getLaserSpawn()
      const laser = new Laser(this, x, y, this.ship.rotation)
      this.lasers.push(laser)
    }

    for (const laser of this.lasers) {
      laser.update(t, d)
      if (this.isOutOfBounds(laser)) {
        laser.destroy()
        this.lasers = this.lasers.filter((l) => l !== laser)
      }
    }
  }

  private handleAsteroids(t: number, d: number) {
    for (const asteroid of this.asteroids) {
      asteroid.update(t, d)
    }
  }

  private getLaserSpawn() {
    const x = 20 * Math.cos(this.ship.rotation) + this.ship.x
    const y = 20 * Math.sin(this.ship.rotation) + this.ship.y
    return [x, y]
  }

  private isOutOfBounds(laser: Laser) {
    const sprite = laser.sprite
    const threshold = 20

    if (sprite.x < -threshold) {
      return true
    }

    if (sprite.x > this.game.canvas.width + threshold) {
      return true
    }

    if (sprite.y < -threshold) {
      return true
    }

    if (sprite.y > this.game.canvas.height + threshold) {
      return true
    }

    return false
  }

  private getRandomAsteroid() {
    return new Asteroid(this, {
      velocity: new Vector(
        getRandomFloat(-1, 1),
        getRandomFloat(-1, 1)
      ).normalize(),
      size: AsteroidSize.LARGE,
      position: new Vector(
        getRandomInt(0, this.game.canvas.width),
        getRandomInt(0, this.game.canvas.height)
      ),
    })
  }
}
