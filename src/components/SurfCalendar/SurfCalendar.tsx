import { DayPicker, DayButton } from "react-day-picker";
import type { DayButtonProps } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import styles from "./SurfCalendar.module.scss";
import { getStatusColor } from "../../api/utils/getStatusColor";

interface WeatherStatus {
  date: string;
  status: string;
  description: string;
}

interface SurfCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  weatherRange: WeatherStatus[];
}

export const SurfCalendar = ({
  selected,
  onSelect,
  weatherRange,
}: SurfCalendarProps) => {
  const isDateDisabled = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const hasData = weatherRange.some((w) => w.date === dateString);
    return !hasData;
  };

  const CustomDayButton = (props: DayButtonProps) => {
    const { day, ...buttonProps } = props;
    const dateString = format(day.date, "yyyy-MM-dd");
    const statusForDay = weatherRange.find((w) => w.date === dateString);

    return (
      <DayButton day={day} {...buttonProps}>
        {day.date.getDate()}
        {statusForDay && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: getStatusColor(statusForDay.status),
              zIndex: 10,
            }}
          />
        )}
      </DayButton>
    );
  };

  return (
    <div className={styles.wrapper}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        weekStartsOn={1}
        showOutsideDays={true}
        disableNavigation={true}
        disabled={isDateDisabled}
        components={{
          DayButton: CustomDayButton,
        }}
      />
    </div>
  );
};
