const teamMembers = [
  {
    name: "Daksh Gupta",
    role: "Web Developer",
    image: "/team/daksh.jpg",
    linkedin: "https://www.linkedin.com/in/daksh-gupta-a550252a8/",
    github: "https://github.com/daksh1gupta",
  },
  {
    name: "Tanuj Dixit",
    role: "Cybersecurity Developer",
    image: "/team/tanuj.jpg",
    linkedin: "https://www.linkedin.com/in/tanuj-dixit-963881325/",
    github: "https://github.com/tanuj26812",
  },
  {
    name: "Vimal Gautam",
    role: "Web Developer",
    image: "/team/vimal.jpg",
    linkedin: "https://www.linkedin.com/in/vimalgautam/",
    github: "https://github.com/gautamvimal",
  },
  {
    name: "Sujal Raghuvanshi",
    role: "AI Developer",
    image: "/team/sujal.jpg",
    linkedin: "https://www.linkedin.com/in/sujal-raghuvanshi-3430672b1/",
    github: "https://github.com/Sujal-Raghuvanshi",
  },
  {
     name: "Digvijay Chandel",
    role: "AI Developer",
    image: "/team/Digvijay.jpg",
    linkedin: "https://www.linkedin.com/in/digvijay-singh-chandel-9726993a4/",
    github:"https://github.com/digvijaysinghchandel043-labs",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative z-10 py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Meet the Team
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto mb-16">
          A diverse team combining expertise in web development, artificial
          intelligence, and cybersecurity to create an innovative learning
          platform.
        </p>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
                key={index}
                className="
                    group
                    border border-white/10 rounded-xl p-4
                    bg-black/20
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
                "
            >

              {/* Default DP */}
                <div className="w-full h-40 rounded-lg mb-4 overflow-hidden
                  border border-white/10
                  group-hover:border-cyan-400/40
                  transition-all duration-300
                  bg-gradient-to-br from-white/5 to-white/10
                ">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-cyan-400/70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                        />
                      </svg>
                    </div>
                  )}
                </div>

              <h3 className="text-white font-medium">{member.name}</h3>
              <p className="text-cyan-400 text-sm mt-1">{member.role}</p>
              <div className="flex justify-center gap-3 mt-2">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <img src="/icons/linkedin.png" className="w-5 h-5" alt="LinkedIn" />
                  </a>
                )}

                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <img src="/icons/github.png" className="w-5 h-5" alt="GitHub" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
