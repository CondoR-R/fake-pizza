export const mapPizzaSize = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const mapPizzaType = {
  1: "Тонкое",
  2: "Традиционное",
} as const;

export const piizaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
  value,
  name,
}));
