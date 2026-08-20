import { useLocation, useNavigate } from "react-router-dom";
import { Stepper } from "../../assets/Stepper/Stepper";
import styles from "./PaymentPage.module.scss";
import { BookingInfoPanel } from "../../components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel";
import boardIMG from "../../assets/RentalPageImgs/paymentBoardIMG.svg";
import { PaymentForm } from "../../components/BookingBlockComponents/PaymentForm/PaymentForm";
import lockIMG from "../../assets/RentalPageImgs/lockIMG.svg";
import { PaymentOrderSummary } from "../../components/BookingBlockComponents/PaymentOrderSummary/PaymentOrderSummary";

export const PaymentPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();

  return (
    <div className={styles.paymentBlock}>
      <Stepper />

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <img src={boardIMG} alt="" />
          <PaymentOrderSummary
            participants={bookingData?.participantsData ?? []}
            onBack={() => navigate("/rental")}
            onPay={() => navigate("/confirmed", { state: bookingData })}
          />
        </div>

        <div className={styles.rightColumn}>
          <h1 className={styles.paymentTitle}>Payment</h1>
          <p className={styles.pText}>
            <img src={lockIMG} alt="" />
            Review your booking and complete your payment.
          </p>

          <BookingInfoPanel
            selectedDate={bookingData?.selectedDate}
            selectedTime={bookingData?.selectedTime}
            participantsCount={bookingData?.participantsData?.length ?? 0}
            readonly={true}
          />
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};
