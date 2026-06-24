import Image from "next/image";
import Hero from "./Components/Main";
import PopularHomes from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChoose";
import ReviewCards from "./Reviewcard/page";
import Trustedcustomers from "./Components/Trustedcustomers";
export default function Home() {
  return (
  <>

   <Hero></Hero>
    <PopularHomes></PopularHomes>
    <WhyChooseUs></WhyChooseUs>
    <Trustedcustomers></Trustedcustomers>
    <ReviewCards></ReviewCards>
  
  </>
  );
}
