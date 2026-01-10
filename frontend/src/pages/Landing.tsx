import ContactSection from "@/components/ContactSection";
import TeamSection from "@/components/TeamSection";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";


const Landing = () => {
  return (
    <>
      <Helmet>
        <title>WebAttack Sandbox | Learn Web Security</title>
        <meta
          name="description"
          content="A safe environment to understand real-world web vulnerabilities with AI assistance."
        />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-hidden">
        <CyberBackground />
        <Navbar />

        <main>
          <HeroSection />
          {/* ABOUT */}
          <section
            id="about"
            className="relative z-10 py-24 px-6 border-t border-white/10"
          >
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                About WebAttack Sandbox
              </h2>

              <p className="text-gray-400 max-w-3xl mx-auto">
                WebAttack Sandbox is a secure learning platform where students
                can practice real-world web vulnerabilities like SQL Injection
                using guided challenges and AI assistance.
              </p>
            </div>
          </section>

          <TeamSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
