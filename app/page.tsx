import Hero from "@/components/landing/Hero";
import Confusion from "@/components/landing/Confusion";
import Transformation from "@/components/landing/Transformation";
import ErrorAnatomy from "@/components/landing/ErrorAnatomy";
import AtlasNetwork from "@/components/landing/AtlasNetwork";
import Knowledge from "@/components/landing/Knowledge";
import DebuggingMemory from "@/components/landing/DebuggingMemory";
import Philosophy from "@/components/landing/Philosophy";
import FinalCTA from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Confusion />
      <Transformation />
      <ErrorAnatomy />
      <AtlasNetwork />
      <Knowledge />
      <DebuggingMemory />
      <Philosophy />
      <FinalCTA />
    </>
  );
}
