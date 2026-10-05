// src/components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel.tsx
import { addDays, format, parseISO } from "date-fns";
import timer from "../../../assets/RentalPageImgs/ClocksImg.svg";
import calendar from "../../../assets/calendar.svg";
import arrow from "../../../assets/RentalPageImgs/hugeicons_arrow-down-01.svg";
import peoples from "../../../assets/RentalPageImgs/PeoplesImg.svg";
import styles from "./BookingInfoPanel.module.scss";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface BookingInfoPanelProps {
  selectedDate: Date | string | undefined;
  selectedTime: string;
  participantsCount: number;
  readonly?: boolean;

  onDateChange?: (date: string) => void;
  onTimeChange?: (time: string) => void;
  onParticipantsChange?: (count: number) => void;
}

const TIME_OPTIONS = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const PARTICIPANT_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);
const DATE_OPTIONS_COUNT = 8;

const toDate = (value: Date | string) =>
  typeof value === "string" ? parseISO(value) : value;

export const BookingInfoPanel = ({
  selectedDate,
  selectedTime,
  participantsCount,
  readonly = false,
  onDateChange,
  onTimeChange,
  onParticipantsChange,
}: BookingInfoPanelProps) => {
  const isMobile = useIsMobile();
  const dateFormat = isMobile ? "MMM d" : "MMMM d";
  return (
    <div className={styles.infoPanel}>
      <div className={styles.infoItem}>
        <img src={calendar} alt="" />
        <div className={styles.dropdownWrapper}>
          <span className={styles.infoLabel}>Rental Date</span>
          {readonly || !onDateChange ? (
            <span className={styles.infoValue}>
              {selectedDate && format(toDate(selectedDate), dateFormat)}
            </span>
          ) : (
            <DateDropdown
              value={selectedDate as string}
              dateFormat={dateFormat}
              onChange={onDateChange}
            />
          )}
        </div>
      </div>

      <div className={styles.infoItem}>
        <img src={timer} alt="" />
        <div className={styles.dropdownWrapper}>
          <span className={styles.infoLabel}>Board issuance time</span>
          {readonly ? (
            <span className={styles.infoValue}>{selectedTime}</span>
          ) : (
            <TimeDropdown value={selectedTime} onChange={onTimeChange!} />
          )}
        </div>
      </div>

      <div className={styles.infoItem}>
        <img src={peoples} alt="" />
        <div className={styles.dropdownWrapper}>
          <span className={styles.infoLabel}>Number of participants</span>
          {readonly ? (
            <span className={styles.infoValue}>
              {isMobile ? participantsCount : `Persons ${participantsCount}`}
            </span>
          ) : (
            <PeopleDropdown
              value={participantsCount}
              onChange={onParticipantsChange!}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

const DateDropdown = ({
  value,
  dateFormat,
  onChange,
}: {
  value: string;
  dateFormat: string;
  onChange: (date: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dateOptions = Array.from({ length: DATE_OPTIONS_COUNT }, (_, i) =>
    format(addDays(new Date(), i), "yyyy-MM-dd"),
  );
  return (
    <div className={styles.infoValue} onClick={() => setIsOpen(!isOpen)}>
      {value && format(parseISO(value), dateFormat)}
      <button className={styles.dropdownArrow}>
        <img src={arrow} alt="" />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {dateOptions.map((date) => (
            <li
              key={date}
              onClick={() => {
                onChange(date);
                setIsOpen(false);
              }}
            >
              {format(parseISO(date), dateFormat)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TimeDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (time: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.infoValue} onClick={() => setIsOpen(!isOpen)}>
      {value}
      <button className={styles.dropdownArrow}>
        <img src={arrow} alt="" />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {TIME_OPTIONS.map((time) => (
            <li
              key={time}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PeopleDropdown = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (count: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.infoValue} onClick={() => setIsOpen(!isOpen)}>
      Persons {value}
      <button className={styles.dropdownArrow}>
        <img src={arrow} alt="" />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {PARTICIPANT_OPTIONS.map((num) => (
            <li
              key={num}
              onClick={() => {
                onChange(num);
                setIsOpen(false);
              }}
            >
              {num}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
