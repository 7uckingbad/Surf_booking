import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./SurfCalendar.module.scss";

export const SurfCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      weekStartsOn={1}
      showOutsideDays={true}
    />
  );
};
