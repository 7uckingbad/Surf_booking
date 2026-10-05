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
import { createBooking } from "../../api/api";
import { transformParticipants } from "../../api/utils/transformParticipants";
import { format, isValid } from "date-fns";
import { BOARD_OPTIONS } from "../../data/board";
import { hasErrors, validateRental } from "../../utils/validation";
import { scrollToFirstError } from "../../utils/scrollToFirstError";

interface ParticipantData {
  name: string;
  boardId: string;
  withInstructor: boolean;
  hours: number;
}

interface RentalLocationState {
  packageTitle?: string;
  packageImage?: string;
  withInstructor?: boolean;
  selectedDate?: string | Date;
  selectedTime?: string;
  participantsData?: ParticipantData[];
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

const createEmptyParticipant = (): ParticipantData => ({
  name: "",
  boardId: "",
  withInstructor: false,
  hours: 1,
});

const createInitialParticipant = (
  bookingData: RentalLocationState | null,
): ParticipantData => {
  const matchedBoard = BOARD_OPTIONS.find(
    (b) =>
      b.fullLabel === bookingData?.packageTitle ||
      b.shortLabel === bookingData?.packageTitle,
  );

  return {
    name: "",
    boardId: matchedBoard?.id ?? "",
    withInstructor: bookingData?.withInstructor ?? false,
    hours: 1,
  };
};

const getInitialDate = (value: unknown): string => {
  const today = format(new Date(), "yyyy-MM-dd");
  if (!value) return today;

  let date: string;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    date = value;
  } else {
    const parsed = new Date(value as string | Date);
    if (!isValid(parsed)) return today;
    date = format(parsed, "yyyy-MM-dd");
  }

  return date < today ? today : date;
};

export const RentalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as RentalLocationState | null;
  const [selectedDate, setSelectedDate] = useState(() =>
    getInitialDate(bookingData?.selectedDate),
  );
  const [participantsCount, setParticipantsCount] = useState<number>(
    bookingData?.participantsData?.length ?? 1,
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    bookingData?.selectedTime ?? "08:00",
  );
  const [fullName, setFullName] = useState<string>(bookingData?.fullName ?? "");
  const [email, setEmail] = useState<string>(bookingData?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    bookingData?.phoneNumber ?? "",
  );

  const [participantsData, setParticipantsData] = useState<ParticipantData[]>(
    () =>
      bookingData?.participantsData ??
      Array.from({ length: participantsCount }, (_, i) =>
        i === 0
          ? createInitialParticipant(bookingData)
          : createEmptyParticipant(),
      ),
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

  const [lastBoardId, setLastBoardId] = useState(
    () =>
      BOARD_OPTIONS.find((b) => b.shortLabel === bookingData?.packageTitle)
        ?.id ??
      participantsData[0]?.boardId ??
      "",
  );
  const selectedBoardIds = participantsData
    .map((p) => p.boardId)
    .filter(Boolean);
  const activeBoardId = selectedBoardIds.includes(lastBoardId)
    ? lastBoardId
    : selectedBoardIds[0];
  const activeBoard = BOARD_OPTIONS.find((b) => b.id === activeBoardId);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const errors = submitAttempted
    ? validateRental({
        fullName,
        email,
        phoneNumber,
        participants: participantsData,
      })
    : {};

  return (
    <div className={styles.rentalBLock}>
      <img src={heroLogo} alt="" className={styles.heroLogo} />
      <Stepper />
      <PackageInfo
        activeBoard={activeBoard}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        participantsCount={participantsCount}
        setParticipantsCount={setParticipantsCount}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        errors={errors}
      />

      <h3 className={styles.participantTitle}>Participants & Equipment</h3>

      <div className={styles.bookingColumns}>
        <div className={styles.leftColumn}>
          {participantsData.map((data, index) => (
            <ParticipantCard
              key={index}
              number={index + 1}
              data={data}
              boardError={errors[`board-${index}`]}
              onChange={(updated) => {
                if (updated.boardId && updated.boardId !== data.boardId) {
                  setLastBoardId(updated.boardId);
                }
                setParticipantsData((prev) =>
                  prev.map((p, i) => (i === index ? updated : p)),
                );
              }}
            />
          ))}
          {hasSelectedBoard && (
            <OrderSummaryTotal
              participants={participantsData}
              onContinue={async () => {
                setSubmitAttempted(true);
                const currentErrors = validateRental({
                  fullName,
                  email,
                  phoneNumber,
                  participants: participantsData,
                });
                if (hasErrors(currentErrors)) {
                  scrollToFirstError();
                  return;
                }

                const payload = {
                  fullName,
                  rentalDate: selectedDate,
                  issuanceTime: selectedTime,
                  email,
                  phoneNumber,
                  participants: transformParticipants(participantsData),
                };

                const result = await createBooking(payload);

                if (result) {
                  navigate("/payment", {
                    state: {
                      ...bookingData,
                      selectedDate,
                      packageTitle:
                        activeBoard?.shortLabel ?? bookingData?.packageTitle,
                      packageImage:
                        activeBoard?.image ?? bookingData?.packageImage,
                      participantsData,
                      selectedTime,
                      fullName,
                      email,
                      phoneNumber,
                      bookingId: result.id,
                    },
                  });
                } else {
                  alert("Something went wrong, please try again.");
                }
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
