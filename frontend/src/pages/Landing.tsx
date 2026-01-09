import ContactSection from "@/components/ContactSection";
import TeamSection from "@/components/TeamSection";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import { Link } from "react-router-dom";

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

          {/* SANDBOX CTA SECTION */}
          <section className="relative z-10 py-24 px-6 border-t border-white/10">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Practice in Realistic Sandboxes
              </h2>

              <p className="text-gray-400 max-w-3xl mx-auto mb-12">
                Explore vulnerable applications designed for learning real-world
                web security issues safely.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                {/* SQL SANDBOX BUTTON */}
                <Link
                  to="/sql-sandbox"
                  className="px-8 py-4 rounded-xl border border-cyan-400/40
                  text-cyan-400 hover:bg-cyan-400/10 transition-all"
                >
                  Enter SQL Sandbox
                </Link>

                {/* PYTHON SANDBOX (COMING SOON) */}
                <button
                  disabled
                  className="px-8 py-4 rounded-xl border border-white/10
                  text-gray-500 cursor-not-allowed"
                >
                  Python Sandbox (Coming Soon)
                </button>
              </div>
            </div>
          </section>

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
