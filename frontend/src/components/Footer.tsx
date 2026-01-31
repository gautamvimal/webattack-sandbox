const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

          {/* COLUMN 1 : BRAND */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              WebAttack Sandbox
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A secure learning platform to understand real-world web
              vulnerabilities through hands-on practice and AI-assisted guidance.
            </p>
          </div>

          {/* COLUMN 2 : QUICK LINKS */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer">About</li>
              <li className="hover:text-cyan-400 cursor-pointer">Team</li>
              <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* COLUMN 3 : RESOURCES */}
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer">Documentation</li>
              <li className="hover:text-cyan-400 cursor-pointer">SQL Sandbox</li>
              <li className="hover:text-cyan-400 cursor-pointer">Python Sandbox</li>
              <li className="hover:text-cyan-400 cursor-pointer">Security Labs</li>
            </ul>
          </div>

          {/* COLUMN 4 : CONTACT */}
          {/* COLUMN 4 : CONTACT */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="text-white">Daksh Gupta:</span>{" "}
                <a href="tel:+918791577847"className="text-cyan-400 hover:underline">+91 87915 77847</a>
              </li>
              <li>
                <span className="text-white">Tanuj Dixit:</span>{" "}
                <a href="+91 84009 00994"className="text-cyan-400 hover:underline">+91 84009 00994</a>
              </li>
              <li>
                <span className="text-white">Vimal Gautam:</span>{" "}
                <a href="tel:+918433244233"className="text-cyan-400 hover:underline">tel:+918433244233</a>
              </li>
              <li>
                <span className="text-white">Sujal Raghuvanshi:</span>{" "}
                <a href="tel:+918265951082"className="text-cyan-400 hover:underline">+91 82659 51082</a>
              </li>
              <li>
                <span className="text-white">Digvijay Chandel:</span>{" "}
                <a href="tel:+91 96395 06029"className="text-cyan-400 hover:underline">+91 96395 06029</a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2025 WebAttack Sandbox. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built for learning & defense</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
