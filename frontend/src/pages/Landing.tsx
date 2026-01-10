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

    <div className="space-y-6 text-gray-400 max-w-3xl mx-auto text-left leading-relaxed">

      <p>
        🔐 <span className="text-white font-medium">What is WebAttack Sandbox?</span><br />
        WebAttack Sandbox is an AI-guided cybersecurity learning platform that helps
        students understand real-world web vulnerabilities in a safe, ethical, and
        controlled environment.
      </p>

      <p>
        🧪 <span className="text-white font-medium">Hands-On Learning</span><br />
        Instead of relying on theory alone, learners interact with intentionally
        vulnerable dummy applications to observe how common attacks work — and why
        they work.
      </p>

      <p>
        🤖 <span className="text-white font-medium">AI as a Mentor</span><br />
        The integrated AI does not generate exploits or perform attacks. It acts as
        a cybersecurity mentor, explaining results, highlighting insecure coding
        practices, and guiding learners toward secure implementations.
      </p>

      <p>
        🛡️ <span className="text-white font-medium">Ethics & Safety First</span><br />
        All labs use dummy data, target no real systems, and run in a sandboxed
        environment, ensuring learning remains responsible and educational.
      </p>

    </div>
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
