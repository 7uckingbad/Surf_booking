import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Homepage } from "./pages/HomePage/Homepage";

function App() {
  return (
    <>
      <div className="heroSection">
        <Hero />
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </>
  );
}
export default App;
