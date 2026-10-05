import sofboardPaymentImg from "../assets/ChooseYourPackImg/SoftBoardImg.svg";
import hardboardPaymentImg from "../assets/ChooseYourPackImg/hardBoardImg.svg";
import perfomancePaymentImg from "../assets/ChooseYourPackImg/PerfomanceImg.svg";

export interface BoardOption {
  id: string;
  packId: number;
  level: string;
  shortLabel: string;
  fullLabel: string;
  price: number;
  image: string;
}

export const BOARD_OPTIONS: BoardOption[] = [
  {
    id: "beginner-soft",
    packId: 1,
    level: "Beginner",
    shortLabel: "Softboard Rental",
    fullLabel: "Beginner Softboard Rental",
    price: 40,
    image: sofboardPaymentImg,
  },
  {
    id: "intermediate-hard",
    packId: 2,
    level: "Intermediate",
    shortLabel: "Hardboard Rental",
    fullLabel: "Intermediate Hardboard Rental",
    price: 55,
    image: hardboardPaymentImg,
  },
  {
    id: "pro-performance",
    packId: 3,
    level: "Pro",
    shortLabel: "Performance Pack",
    fullLabel: "Pro Performance Pack",
    price: 70,
    image: perfomancePaymentImg,
  },
];

export const INSTRUCTOR_PRICE = 20;
