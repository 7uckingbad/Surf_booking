import { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import { Footer } from "./components/Footer/Footer";

const Homepage = lazy(() =>
  import("./pages/HomePage/Homepage").then((m) => ({ default: m.Homepage })),
);
const RentalPage = lazy(() =>
  import("./pages/RentalPage/RentalPage").then((m) => ({
    default: m.RentalPage,
  })),
);
const PaymentPage = lazy(() =>
  import("./pages/PaymentPage/PaymentPage").then((m) => ({
    default: m.PaymentPage,
  })),
);
const ConfirmedPage = lazy(() =>
  import("./pages/ConfirmedPage/ConfirmedPage").then((m) => ({
    default: m.ConfirmedPage,
  })),
);

function App() {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [isPageLoading, setIsPageLoading] = useState(false);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsPageLoading(true);
  }

  useEffect(() => {
    if (isPageLoading) {
      const timer = setTimeout(() => setIsPageLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading]);

  return (
    <>
      {isPageLoading && <Loader />}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmed" element={<ConfirmedPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
