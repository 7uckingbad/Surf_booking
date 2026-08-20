import { useState } from "react";
import { useLocation } from "react-router-dom";

import surfImg from "../../../assets/RentalPageImgs/Rental_Image_Board.svg";

import checked from "../../../assets/RentalPageImgs/Icon hugeicons_tick-01.svg.svg";

import styles from "./PackageInfo.module.scss";
import { BookingInfoPanel } from "../BookingInfoPanel/BookingInfoPanel";

interface PackageInfoProps {
  participantsCount: number;
  setParticipantsCount: (count: number) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export const PackageInfo = ({
  participantsCount,
  setParticipantsCount,
  selectedTime,
  setSelectedTime,
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
    "Perfomance Pack": {
      tags: ["Pro-level board", "For advanced surfers"],
      descriptions:
        "Top-tier board + carbon fins and premium wetsuit included.",
    },
  };

  const currentPackageDetails = packageDetails[bookingData?.packageTitle] || {
    tags: [],
    descriptions: "",
  };
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+380");

  return (
    <div className={styles.twoColumns}>
      <img src={surfImg} alt="" />
      <div className={styles.rightColumn}>
        <h1 className={styles.title}>{bookingData?.packageTitle}</h1>
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

        <BookingInfoPanel
          selectedDate={bookingData?.selectedDate}
          selectedTime={selectedTime}
          participantsCount={participantsCount}
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
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <div className={styles.phoneRow}>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
