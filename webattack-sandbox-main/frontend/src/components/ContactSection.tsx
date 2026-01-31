const contacts = [
  { name: "Daksh", phone: "+91 87915 77847" },
  { name: "Vimal", phone: "+91 84332 44233" },
  { name: "Digvijay", phone: "+91 96395 06029" },
  { name: "Sujal", phone: "+91 82659 51082" },
  { name: "Tanuj", phone: "+91 84009 00994" },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative z-10 py-24 px-6 border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Contact Us
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto mb-14">
          Reach out to the team for collaboration, queries, or guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="
                border border-white/10 rounded-xl p-6
                bg-black/20
                transition-all duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
                hover:-translate-y-1
              "
            >
              <h3 className="text-white font-medium mb-2">
                {contact.name}
              </h3>
              <p className="text-cyan-400 text-sm">
                {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
