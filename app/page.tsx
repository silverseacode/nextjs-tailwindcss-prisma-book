import Coaches from "@/components/coaches";
import Contact from "@/components/contact";
import Faq from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Intro />
      <Features />
      <Coaches />
      <Faq/>
      <Contact/>
      <Footer/>
    </main>
  );
}
