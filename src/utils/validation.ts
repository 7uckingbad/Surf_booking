import type { ParticipantData } from "../components/BookingBlockComponents/ParticipantCard/ParticipantCard";

export type FormErrors = Record<string, string>;

export const hasErrors = (errors: FormErrors) => Object.keys(errors).length > 0;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Rental ----------

export const validateRental = (values: {
  fullName: string;
  email: string;
  phoneNumber: string;
  participants: ParticipantData[];
}): FormErrors => {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Invalid email";
  }

  const phoneDigits = values.phoneNumber.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phoneNumber = "Enter your phone number";
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phoneNumber = "Invalid phone number";
  }

  values.participants.forEach((p, index) => {
    if (!p.boardId) {
      errors[`board-${index}`] = "Select a board";
    }
  });

  return errors;
};

// ---------- Payment ----------

export const validatePayment = (values: {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  agreedToTerms: boolean;
}): FormErrors => {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter the name on the card";
  }

  const cardDigits = values.cardNumber.replace(/\s/g, "");
  if (!cardDigits) {
    errors.cardNumber = "Enter your card number";
  } else if (!/^\d{16}$/.test(cardDigits)) {
    errors.cardNumber = "Card number must have 16 digits";
  }

  const expiryMatch = values.expiryDate.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!values.expiryDate) {
    errors.expiryDate = "Enter expiry date";
  } else if (!expiryMatch) {
    errors.expiryDate = "Use MM/YY format";
  } else {
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    const now = new Date();
    const isExpired =
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1);
    if (isExpired) {
      errors.expiryDate = "Card has expired";
    }
  }

  if (!/^\d{3}$/.test(values.cvv)) {
    errors.cvv = "CVV must have 3 digits";
  }

  if (!values.agreedToTerms) {
    errors.agreedToTerms = "You need to agree to continue";
  }

  return errors;
};
