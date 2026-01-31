import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, User } from 'lucide-react';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#' },
    { name: 'Team', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--cyber-glow))]" />
              <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              WebAttack<span className="text-primary">Sandbox</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side - Login/Avatar */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={logout}
                className="relative group"
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary/50 bg-secondary flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_hsl(var(--cyber-glow)/0.4)]">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="cyber-button px-5 py-2 rounded-md font-mono text-sm"
              >
                Login
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
