import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import CyberBackground from '@/components/CyberBackground';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    login();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Login | WebAttack Sandbox</title>
        <meta name="description" content="Login to WebAttack Sandbox to access practice environments for web security training." />
      </Helmet>

      <div className="relative min-h-screen bg-background flex items-center justify-center px-6">
        <CyberBackground />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group z-10"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-mono">Back</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          {/* Login Card */}
          <div className="cyber-card cyber-border-glow p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                className="relative mb-4"
              >
                <Shield className="h-12 w-12 text-primary" />
                <div className="absolute inset-0 bg-primary/30 blur-xl animate-pulse" />
              </motion.div>
              <h1 className="font-mono text-2xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Access your security sandbox
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input w-full px-4 py-3 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyber-input w-full px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground/50"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cyber-button w-full py-3 rounded-md font-mono font-medium relative overflow-hidden disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                    />
                    Authenticating...
                  </span>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>

            {/* Footer text */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Demo mode — No real authentication required
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
        </motion.div>
      </div>
    </>
  );
};

export default Login;
