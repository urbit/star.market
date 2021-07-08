import Star from "../types/Star";

export const addOrRemove = (stars: Star[], star: Star) => {
  if (stars.find(({ point }) => point === star.point)) {
    return stars.filter(({ point }) => point !== star.point)
  }

  return stars.concat([star])
}
