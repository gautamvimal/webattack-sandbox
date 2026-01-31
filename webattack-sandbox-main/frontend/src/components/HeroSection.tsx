import { motion } from 'framer-motion';
import { Lightbulb, Database, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const sandboxCards = [
    {
      icon: Database,
      title: 'SQL Sandbox',
      subtitle: 'Practice SQL attacks',
      path: '/sql-sandbox',
    },
    {
      icon: Code2,
      title: 'Python Sandbox',
      subtitle: 'Practice Python vulns',
      path: '/python-sandbox',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Glowing Lightbulb Icon */}
      <motion.div
        className="absolute top-32 right-[15%] hidden lg:block"
        animate={{
          y: [0, -10, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative">
          <Lightbulb className="h-12 w-12 text-primary/60" />
          <div className="absolute inset-0 bg-primary/30 blur-xl" />
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
          <span className="text-foreground">WEBATTACK</span>
        </h1>
        <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="text-primary cyber-text-glow">SANDBOX</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-mono text-lg md:text-xl text-primary mb-4"
      >
        Learn • Practice • Secure
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-muted-foreground text-center max-w-xl mb-12 text-sm md:text-base"
      >
        A safe environment to understand real-world web vulnerabilities with AI assistance.
      </motion.p>

      {/* Sandbox Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        {sandboxCards.map((card, index) => (
          <motion.button
            key={card.title}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(card.path)}
            className="cyber-card group cursor-pointer w-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <card.icon className="h-10 w-10 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_15px_hsl(var(--cyber-glow))]" />
                <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-semibold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </section>
  );
};

export default HeroSection;
