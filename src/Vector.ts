export class Vector {
  constructor(public x: number, public y: number) {}

  add(other: Vector): this {
    this.x += other.x
    this.y += other.y
    return this
  }

  subtract(other: Vector): this {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  multiply(scale: number): this {
    this.x *= scale
    this.y *= scale
    return this
  }

  divide(scale: number): this {
    this.x /= scale
    this.y /= scale
    return this
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize(): this {
    const mag = this.magnitude()
    if (mag === 0) {
      this.x = 1
      this.y = 0
    } else {
      this.divide(mag)
    }
    return this
  }

  copy(): Vector {
    return new Vector(this.x, this.y)
  }

  setMagnitude(mag: number): this {
    this.normalize()
    this.multiply(mag)
    return this
  }

  heading(): number {
    return this.copy().normalize().magnitude()
  }

  limit(maxX: number, maxY?: number): void {
    if (!maxY) {
      maxY = maxX
    }

    if (this.x > maxX) {
      this.x = maxX
    }

    if (this.y > maxY) {
      this.y = maxY
    }
  }

  min(limit: number): void {
    if (this.x < limit) {
      this.x = limit
    }

    if (this.y < limit) {
      this.y = limit
    }
  }

  static add(v: Vector, u: Vector): Vector {
    return new Vector(v.x + u.x, v.y + u.y)
  }

  static subtract(v: Vector, u: Vector): Vector {
    return new Vector(v.x - u.x, v.y - u.y)
  }

  static multiply(v: Vector, scale: number): Vector {
    return new Vector(v.x * scale, v.y * scale)
  }

  static divide(v: Vector, scale: number): Vector {
    return new Vector(v.x / scale, v.y / scale)
  }

  static distance(v1: Vector, v2: Vector) {
    // √[(x₂ - x₁)² + (y₂ - y₁)²]
    const xDiff = v2.x - v1.x
    const x = xDiff * xDiff
    const yDiff = v2.y - v1.y
    const y = yDiff * yDiff
    return Math.sqrt(x + y)
  }

  static Zero() {
    return new Vector(0, 0)
  }
}
