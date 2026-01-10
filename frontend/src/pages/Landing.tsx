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

    <div className="space-y-6 text-gray-400 max-w-3xl mx-auto text-left leading-relaxed">
      <p>
        🔐 <span className="text-white font-medium">What is WebAttack Sandbox?</span><br />
        WebAttack Sandbox is an AI-guided cybersecurity learning platform where
        students safely explore real-world web vulnerabilities in a controlled
        environment.
      </p>

      <p>
        🧪 <span className="text-white font-medium">Hands-On Learning</span><br />
        Learners interact with intentionally vulnerable dummy applications to
        understand how common attacks work — and why they succeed.
      </p>

      <p>
        🤖 <span className="text-white font-medium">AI as a Mentor</span><br />
        The AI does not generate exploits. Instead, it explains outcomes,
        highlights insecure coding practices, and guides learners toward
        secure implementations.
      </p>

      <p>
        🛡️ <span className="text-white font-medium">Ethics & Safety First</span><br />
        All labs use dummy data, target no real systems, and run in sandboxed
        environments to ensure ethical and responsible learning.
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
