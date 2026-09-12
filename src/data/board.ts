export interface BoardOption {
  id: string;
  packId: number;
  level: string;
  shortLabel: string;
  fullLabel: string;
  price: number;
}

export const BOARD_OPTIONS: BoardOption[] = [
  {
    id: "beginner-soft",
    packId: 1,
    level: "Beginner",
    shortLabel: "Softboard Rental",
    fullLabel: "Beginner Softboard Rental",
    price: 40,
  },
  {
    id: "intermediate-hard",
    packId: 2,
    level: "Intermediate",
    shortLabel: "Hardboard Rental",
    fullLabel: "Intermediate Hardboard Rental",
    price: 55,
  },
  {
    id: "pro-performance",
    packId: 3,
    level: "Pro",
    shortLabel: "Performance Pack",
    fullLabel: "Pro Performance Pack",
    price: 70,
  },
];

export const INSTRUCTOR_PRICE = 20;
