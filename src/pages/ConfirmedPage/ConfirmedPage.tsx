import styles from "./ConfirmedPage.module.scss";
import confirmedIMg from "../../assets/ConfirmedImgs/ConfirmedImg.svg";
import { Stepper } from "../../assets/Stepper/Stepper";
import { BookingInfoPanel } from "../../components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel";
import { useLocation } from "react-router-dom";
import downloadImg from "../../assets/ConfirmedImgs/downloadIMG.svg";
import { format } from "date-fns";

export const ConfirmedPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const booking = bookingData?.booking;
  const participants = booking?.participants ?? [];

  return (
    <div className={styles.confirmedBlock}>
      <Stepper />

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <img
            src={bookingData?.packageImage || confirmedIMg}
            alt=""
            className={styles.leftColumnImg}
          />
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.rightT}>Booking confirmed!</h2>
          <p className={styles.rigthP}>
            Your payment was successful and your surfboards are reserved. A
            confirmation has been sent to {booking?.email}
          </p>
          <BookingInfoPanel
            selectedDate={booking?.rentalDate}
            selectedTime={booking?.issuanceTime}
            participantsCount={participants.length}
            readonly={true}
          />

          <div className={styles.confirmationBlock}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Booking ID:</span>
              <span className={styles.detailValue}>{booking?.bookingId}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date:</span>
              <span className={styles.detailValue}>
                {booking?.rentalDate &&
                  format(new Date(booking.rentalDate), "MMMM d, yyyy")}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Time:</span>
              <span className={styles.detailValue}>
                {booking?.issuanceTime}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Guests:</span>
              <span className={styles.detailValue}>
                {participants.length} participants
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Total paid:</span>
              <span className={styles.detailValue}>€{booking?.totalPrice}</span>
            </div>

            <button className={styles.buttonComfirm}>
              Download confirmation
              <img src={downloadImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
