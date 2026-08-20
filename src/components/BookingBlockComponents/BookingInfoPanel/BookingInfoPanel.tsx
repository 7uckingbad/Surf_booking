// src/components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel.tsx
import { format } from "date-fns";
import calendar from "../../../assets/RentalPageImgs/ClocksImg.svg";
import timer from "../../../assets/RentalPageImgs/ClocksImg.svg";
import arrow from "../../../assets/RentalPageImgs/hugeicons_arrow-down-01.svg";
import peoples from "../../../assets/RentalPageImgs/PeoplesImg.svg";
import styles from "./BookingInfoPanel.module.scss";

interface BookingInfoPanelProps {
  selectedDate: Date | string | undefined;
  selectedTime: string;
  participantsCount: number;
  readonly?: boolean;

  onTimeChange?: (time: string) => void;
  onParticipantsChange?: (count: number) => void;
}

const TIME_OPTIONS = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const PARTICIPANT_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export const BookingInfoPanel = ({
  selectedDate,
  selectedTime,
  participantsCount,
  readonly = false,
  onTimeChange,
  onParticipantsChange,
}: BookingInfoPanelProps) => {
  return (
    <div className={styles.infoPanel}>
      <div className={styles.infoItem}>
        <img src={calendar} alt="" />
        <div>
          <span className={styles.infoLabel}>Rental Date</span>
          <span className={styles.infoValue}>
            {selectedDate && format(new Date(selectedDate), "MMMM d")}
          </span>
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
              Persons {participantsCount}
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
