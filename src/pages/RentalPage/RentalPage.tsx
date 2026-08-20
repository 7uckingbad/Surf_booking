import { useState } from "react";
import { Stepper } from "../../assets/Stepper/Stepper";
import { PackageInfo } from "../../components/BookingBlockComponents/PackageInfo/PackageInfo";
import styles from "./RentalPage.module.scss";
import heroLogo from "../../assets/heroLogo/mainLogo.svg";
import { ParticipantCard } from "../../components/BookingBlockComponents/ParticipantCard/ParticipantCard";
import { CollapsibleCard } from "../../components/CollapsibleCard/CollapsibleCard";
import ckeckedImg from "../../assets/ParticipantsIMG/checkedImg.svg";
import importantImg from "../../assets/ParticipantsIMG/importantImg.svg";
import { ParticipantsSummary } from "../../components/BookingBlockComponents/ParticipantsSummary/ParticipantsSummary";
import { OrderSummaryTotal } from "../../components/BookingBlockComponents/OrderSummaryTotal/OrderSummaryTotal";
import { useLocation, useNavigate } from "react-router-dom";

interface ParticipantData {
  name: string;
  boardId: string;
  withInstructor: boolean;
  hours: number;
}

const createEmptyParticipant = (): ParticipantData => ({
  name: "",
  boardId: "",
  withInstructor: false,
  hours: 1,
});

export const RentalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  const [participantsCount, setParticipantsCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState("08:00");

  const [participantsData, setParticipantsData] = useState<ParticipantData[]>(
    () =>
      Array.from({ length: participantsCount }, () => createEmptyParticipant()),
  );

  const [syncedCount, setSyncedCount] = useState(participantsCount);

  if (participantsCount !== syncedCount) {
    setSyncedCount(participantsCount);
    setParticipantsData((prev) => {
      if (participantsCount > prev.length) {
        const toAdd = participantsCount - prev.length;
        const newItems = Array.from({ length: toAdd }, () =>
          createEmptyParticipant(),
        );
        return [...prev, ...newItems];
      } else if (participantsCount < prev.length) {
        return prev.slice(0, participantsCount);
      }
      return prev;
    });
  }
  const hasSelectedBoard = participantsData.some((p) => p.boardId);

  return (
    <div className={styles.rentalBLock}>
      <img src={heroLogo} alt="" className={styles.heroLogo} />
      <Stepper />
      <PackageInfo
        participantsCount={participantsCount}
        setParticipantsCount={setParticipantsCount}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <h3 className={styles.participantTitle}>Participants & Equipment</h3>

      <div className={styles.bookingColumns}>
        <div className={styles.leftColumn}>
          {participantsData.map((data, index) => (
            <ParticipantCard
              key={index}
              number={index + 1}
              data={data}
              onChange={(updated) => {
                setParticipantsData((prev) =>
                  prev.map((p, i) => (i === index ? updated : p)),
                );
              }}
            />
          ))}
          {hasSelectedBoard && (
            <OrderSummaryTotal
              participants={participantsData}
              onContinue={() => {
                navigate("/payment", {
                  state: { ...bookingData, participantsData, selectedTime },
                });
              }}
            />
          )}
        </div>

        <div className={styles.rightColumn}>
          <CollapsibleCard title="Participants">
            <ParticipantsSummary participants={participantsData} />
          </CollapsibleCard>

          <CollapsibleCard title="What is included in each package">
            <ul className={styles.checklist}>
              <li className={styles.checkItem}>
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Board
              </li>
              <li className={styles.checkItem}>
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Leash (safety leash)
              </li>
              <li className={styles.checkItem}>
                {" "}
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Basic briefing
              </li>
              <li className={styles.checkItem}>
                {" "}
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Changing room access
              </li>
              <li className={styles.checkItem}>
                {" "}
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Gear storage
              </li>
              <li className={styles.checkItem}>
                <img src={ckeckedImg} alt="" className={styles.checkIcon} />
                Team support
              </li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard title="Important">
            <ul className={styles.notesList}>
              <li className={styles.checkItem}>
                <img src={importantImg} alt="" className={styles.checkIcon} />
                Available daily from 07:00 to 18:00
              </li>
              <li className={styles.checkItem}>
                <img src={importantImg} alt="" className={styles.checkIcon} />
                Instructor hours are selected separately.
              </li>
              <li className={styles.checkItem}>
                <img src={importantImg} alt="" className={styles.checkIcon} />
                Free cancellation up to 24 hours before the booking.
              </li>
              <li className={styles.checkItem}>
                <img src={importantImg} alt="" className={styles.checkIcon} />
                In case of delay, your reservation remains active.
              </li>
              <li className={styles.checkItem}>
                <img src={importantImg} alt="" className={styles.checkIcon} />
                In case of sudden weather changes (storm or calm), you can
                easily reschedule your session for another day free of charge.
              </li>
            </ul>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
};
