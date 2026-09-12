import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper } from "../../assets/Stepper/Stepper";
import styles from "./PaymentPage.module.scss";
import { BookingInfoPanel } from "../../components/BookingBlockComponents/BookingInfoPanel/BookingInfoPanel";
import { PaymentForm } from "../../components/BookingBlockComponents/PaymentForm/PaymentForm";
import lockIMG from "../../assets/RentalPageImgs/lockIMG.svg";
import { PaymentOrderSummary } from "../../components/BookingBlockComponents/PaymentOrderSummary/PaymentOrderSummary";
import { createPayment } from "../../api/api";

export const PaymentPage = () => {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(bookingData?.fullName ?? "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [billingCountry, setBillingCountry] = useState("Ukraine");

  const handlePay = async () => {
    const [month, year] = expiryDate.split("/");
    const formattedExpiryDate = month && year ? `20${year}-${month}` : "";
    const payload = {
      bookingId: bookingData?.bookingId,
      cardNumber,
      fullName,
      expiryDate: formattedExpiryDate,
      billingCountry,
    };

    const result = await createPayment(payload);

    if (result) {
      navigate("/confirmed", { state: { ...bookingData, ...result } });
    } else {
      alert("Payment failed, please try again.");
    }
  };

  return (
    <div className={styles.paymentBlock}>
      <Stepper />

      <div className={styles.twoColumns}>
        <div className={styles.leftColumn}>
          <img
            src={bookingData?.packageImage}
            alt=""
            className={styles.bookingImg}
          />
          <PaymentOrderSummary
            participants={bookingData?.participantsData ?? []}
            onBack={() => navigate("/rental")}
            onPay={handlePay}
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
          <PaymentForm
            fullName={fullName}
            setFullName={setFullName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            billingCountry={billingCountry}
            setBillingCountry={setBillingCountry}
          />
        </div>
      </div>
    </div>
  );
};
