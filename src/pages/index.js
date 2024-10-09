import About from "./components/About/About";
import Banner from "./components/Banner/Banner";
import Booking from "./components/Booking/Booking";
import Contact from "./components/Contact/Contact";
import Menu from "./components/Menu/Menu";

export default function Home() {
  return (
    <div>
      <div>
        <Banner />
        <Menu />
        <Booking />
        <About />
        <Contact />
      </div>
    </div>
  );
}
