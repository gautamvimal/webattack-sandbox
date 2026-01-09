import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import type { Challenge } from "@/pages/SqlSandbox";

interface VulnerableLoginAppProps {
  challenge: Challenge;
  onLoginAttempt: (username: string, password: string, success: boolean) => void;
}

// SQL injection patterns to detect
const SQL_INJECTION_PATTERNS = [
  /['"]?\s*or\s+['"]?1['"]?\s*=\s*['"]?1/i,
  /['"]?\s*or\s+1\s*=\s*1/i,
  /admin['"]\s*--/i,
  /['"]\s*--/,
  /['"]\s*;/,
  /union\s+select/i,
  /['"]\s*or\s+['"]/i,
  /1\s*=\s*1/,
  /['"]\s*or\s+true/i,
];

export const VulnerableLoginApp = ({ challenge, onLoginAttempt }: VulnerableLoginAppProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "failed">("idle");
  const [isLoading, setIsLoading] = useState(false);

  const detectSqlInjection = (input: string): boolean => {
    return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const hasInjection = detectSqlInjection(username) || detectSqlInjection(password);
    
    // Level 2 is slightly harder - requires specific patterns
    if (challenge.level === 2) {
      const level2Patterns = [
        /admin['"]\s*--/i,
        /union\s+select/i,
      ];
      const hasLevel2Injection = level2Patterns.some(p => p.test(username) || p.test(password));
      
      setResult(hasLevel2Injection ? "success" : "failed");
      onLoginAttempt(username, password, hasLevel2Injection);
    } else {
      setResult(hasInjection ? "success" : "failed");
      onLoginAttempt(username, password, hasInjection);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="border border-dashed border-foreground p-6 animate-fade-in">
      <h2 className="text-lg font-bold mb-6 text-foreground">Vulnerable Login App</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Username</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="bg-input border-dashed border-foreground/30 focus:border-primary font-mono text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Password</label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="bg-input border-dashed border-foreground/30 focus:border-primary font-mono text-sm"
          />
        </div>
        
        <Button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-hover transition-all duration-200"
        >
          {isLoading ? "Authenticating..." : "Login"}
        </Button>
      </div>
      
      {/* Result Section */}
      <div className="mt-6 pt-4 border-t border-dashed border-foreground/30">
        <div className="flex items-center gap-2">
          {result === "idle" && (
            <span className="text-muted-foreground text-sm">Enter credentials to attempt login</span>
          )}
          {result === "failed" && (
            <>
              <X className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-mono">Login Failed</span>
            </>
          )}
          {result === "success" && (
            <>
              <Check className="w-5 h-5 text-success" />
              <span className="text-success font-mono">Access Granted - SQLi Successful!</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
