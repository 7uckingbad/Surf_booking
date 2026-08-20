import styles from "./Stepper.module.scss";
import { useLocation } from "react-router-dom";

const STEP_ROUTES: Record<string, number> = {
  "/rental": 1,
  "/payment": 2,
  "/confirmed": 3,
};

export const Stepper = () => {
  const location = useLocation();
  const currentStep = STEP_ROUTES[location.pathname] ?? 1;

  const steps = [
    { number: 1, label: "Booking" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Confirmed" },
  ];

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <div key={step.number} className={styles.stepWrapper}>
            <div className={styles.step}>
              <div
                className={`${styles.stepCircle} ${isActive ? styles.stepActive : ""} ${isCompleted ? styles.stepCompleted : ""}`}
              >
                {isCompleted ? "✓" : step.number}
              </div>
              <span
                className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : ""}`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`${styles.stepLine} ${
                  currentStep > step.number ? styles.stepLineActive : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
