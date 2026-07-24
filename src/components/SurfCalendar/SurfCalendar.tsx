import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./SurfCalendar.module.scss";

interface SurfCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export const SurfCalendar = ({ selected, onSelect }: SurfCalendarProps) => {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      weekStartsOn={1}
      showOutsideDays={true}
      // defaultMonth={new Date(2026, 6)} // июль
      // startMonth={new Date(2026, 6)} // вместо fromMonth
      // endMonth={new Date(2026, 6)}
      disableNavigation={true}
    />
  );
};
