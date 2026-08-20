export interface BoardOption {
  id: string;
  level: string;
  shortLabel: string;
  fullLabel: string;
  price: number;
}

export const BOARD_OPTIONS: BoardOption[] = [
  {
    id: "beginner-soft",
    level: "Beginner",
    shortLabel: "Softboard Rental",
    fullLabel: "Beginner Softboard Rental",
    price: 40,
  },
  {
    id: "intermediate-hard",
    level: "Intermediate",
    shortLabel: "Hardboard Rental",
    fullLabel: "Intermediate Hardboard Rental",
    price: 55,
  },
  {
    id: "pro-performance",
    level: "Pro",
    shortLabel: "Performance Pack",
    fullLabel: "Pro Performance Pack",
    price: 70,
  },
];

export const INSTRUCTOR_PRICE = 20;
