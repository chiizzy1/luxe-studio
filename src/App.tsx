import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStatement from "./components/BrandStatement";
import ServicesGrid from "./components/ServicesGrid";
import TheCraft from "./components/TheCraft";
import Gallery from "./components/Gallery";
import Testimonial from "./components/Testimonial";
import Marquee from "./components/Marquee";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <>
      <ScrollProgress />
      <ChatWidget />
      <Navbar />
      <Hero />
      <BrandStatement />
      <ServicesGrid />
      <TheCraft />
      <Gallery />
      <Testimonial />
      <Marquee />
      <BookingCTA />
      <Footer />
    </>
  );
}

export default App;
