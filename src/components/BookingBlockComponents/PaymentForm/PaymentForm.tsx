import { useState } from "react";
import styles from "./PaymentForm.module.scss";
import lockIMG from "../../../assets/RentalPageImgs/lockIMG.svg";

interface PaymentFormProps {
  initialFullName?: string;
}

export const PaymentForm = ({ initialFullName = "" }: PaymentFormProps) => {
  const [fullName, setFullName] = useState(initialFullName);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingCountry, setBillingCountry] = useState("Ukraine");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className={styles.paymentForm}>
      <h3 className={styles.formTitle}>Credit or debit card</h3>
      <p className={styles.secureNote}>
        <img src={lockIMG} alt="" /> Your payment is encrypted and secure.
      </p>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.formInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Card number</label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className={styles.formInput}
        />
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Expiry date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>CVV</label>
          <input
            type="text"
            placeholder="•••"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Billing country</label>
        <select
          value={billingCountry}
          onChange={(e) => setBillingCountry(e.target.value)}
          className={styles.formSelect}
        >
          <option value="Ukraine">Ukraine</option>
          <option value="Poland">Poland</option>
          <option value="Germany">Germany</option>
          <option value="USA">USA</option>
        </select>
      </div>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />
        <span>
          I agree to the <a href="#">Terms of Service</a> and{" "}
          <a href="#">Cancellation Policy</a>.
        </span>
      </label>
    </div>
  );
};
