import Image from "next/image";
// import { Button } from "@heroui/react";
import Hero from "./Components/Main";
import PopularHomes from "./Components/Popular";
import WhyChooseUs from "./Components/WhyChoose";
import CustomerReview from "./Components/Review";
export default function Home() {
  return (
  <>

   <Hero></Hero>
    <PopularHomes></PopularHomes>
    <WhyChooseUs></WhyChooseUs>
    <CustomerReview></CustomerReview>
  
  </>
  );
}
