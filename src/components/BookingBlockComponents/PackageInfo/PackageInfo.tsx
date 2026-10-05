import { useState } from "react";
import { useLocation } from "react-router-dom";

import surfImg from "../../../assets/RentalPageImgs/Rental_Image_Board.svg";

import checked from "../../../assets/RentalPageImgs/Icon hugeicons_tick-01.svg.svg";

import styles from "./PackageInfo.module.scss";
import { BookingInfoPanel } from "../BookingInfoPanel/BookingInfoPanel";
import type { BoardOption } from "../../../data/board";
import type { FormErrors } from "../../../utils/validation";

interface PackageInfoProps {
  activeBoard: BoardOption | undefined;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  participantsCount: number;
  setParticipantsCount: (count: number) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  errors: FormErrors;
}

export const PackageInfo = ({
  activeBoard,
  selectedDate,
  setSelectedDate,
  participantsCount,
  setParticipantsCount,
  selectedTime,
  setSelectedTime,
  fullName,
  setFullName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  errors,
}: PackageInfoProps) => {
  const location = useLocation();
  const bookingData = location.state;
  // const totalPrice = bookingData?.withInstructor
  //   ? bookingData.basePrice + 20
  //   : bookingData?.basePrice;

  const packageDetails: Record<
    string,
    { tags: string[]; descriptions: string }
  > = {
    "Softboard Rental": {
      tags: ["All-round board", "For Begginers surfers"],
      descriptions: "Perfect for beginners. Safe, high-buoyancy foam board.",
    },
    "Hardboard Rental": {
      tags: ["All-round board", "For experienced surfers"],
      descriptions:
        "For intermediate & pro surfers. Premium fiberglass and epoxy boards.",
    },
    "Performance Pack": {
      tags: ["Pro-level board", "For advanced surfers"],
      descriptions:
        "Top-tier board + carbon fins and premium wetsuit included.",
    },
  };

  const packageTitle = activeBoard?.shortLabel ?? bookingData?.packageTitle;
  const packageImage =
    activeBoard?.image ?? bookingData?.packageImage ?? surfImg;

  const currentPackageDetails = packageDetails[packageTitle] || {
    tags: [],
    descriptions: "",
  };
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+380");

  return (
    <div className={styles.twoColumns}>
      <img
        src={packageImage}
        alt=""
        className={styles.packageImgDesktop}
      />
      <div className={styles.rightColumn}>
        <h1 className={styles.title}>{packageTitle}</h1>
        <p className={styles.subtitle}>What's included in the package</p>
        <div className={styles.tagsRow}>
          {currentPackageDetails.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              <img src={checked} alt="checkedImg" /> {tag}
            </span>
          ))}
        </div>
        <p className={styles.description}>
          {currentPackageDetails.descriptions}
        </p>
        <img
          src={packageImage}
          alt=""
          className={styles.packageImgMobile}
        />

        <BookingInfoPanel
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          participantsCount={participantsCount}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
          onParticipantsChange={setParticipantsCount}
        />

        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact Information</h3>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`${styles.formInput} ${errors.fullName ? styles.inputError : ""}`}
              aria-invalid={!!errors.fullName}
              maxLength={255}
            />
            {errors.fullName && (
              <span className={styles.errorText}>{errors.fullName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
              aria-invalid={!!errors.email}
              maxLength={255}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <div
              className={`${styles.phoneRow} ${errors.phoneNumber ? styles.inputError : ""}`}
            >
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={styles.countrySelect}
              >
                <option value="+380">+380</option>
                <option value="+1">+1</option>
                <option value="+61">+61</option>
                <option value="+43">+43</option>
                {/*  коды  */}
              </select>
              <input
                type="tel"
                placeholder="(50) 000-00-00"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={styles.formInput}
                aria-invalid={!!errors.phoneNumber}
                maxLength={255}
              />
            </div>
            {errors.phoneNumber && (
              <span className={styles.errorText}>{errors.phoneNumber}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
