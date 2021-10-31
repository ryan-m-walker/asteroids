export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomBool() {
  return Math.random() >= 0.5
}
