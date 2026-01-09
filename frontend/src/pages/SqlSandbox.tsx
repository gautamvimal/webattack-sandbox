import { useState } from "react";
import { ChallengesSidebar } from "@/components/sql-sandbox/ChallengesSidebar";
import { VulnerableLoginApp } from "@/components/sql-sandbox/VulnerableLoginApp";
import { AIAssistant } from "@/components/sql-sandbox/AIAssistant";
import { SandboxBreadcrumb } from "@/components/sql-sandbox/SandboxBreadcrumb";

export type Challenge = {
  id: string;
  name: string;
  level: number;
};

const challenges: Challenge[] = [
  { id: "sqli-1", name: "SQLi Level 1", level: 1 },
  { id: "sqli-2", name: "SQLi Level 2", level: 2 },
];

const SqlSandbox = () => {
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(challenges[0]);
  const [lastAttempt, setLastAttempt] = useState<{ username: string; password: string; success: boolean } | null>(null);
  const [aiContext, setAiContext] = useState<string>("");

  const handleLoginAttempt = (username: string, password: string, success: boolean) => {
    setLastAttempt({ username, password, success });
    setAiContext(`User attempted login with username: "${username}" and password: "${password}". Result: ${success ? "Success (SQLi detected)" : "Failed"}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        <SandboxBreadcrumb />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column - Challenges */}
          <div className="lg:col-span-3">
            <ChallengesSidebar 
              challenges={challenges} 
              activeChallenge={activeChallenge}
              onSelectChallenge={setActiveChallenge}
            />
          </div>
          
          {/* Center Column - Vulnerable Login App */}
          <div className="lg:col-span-5">
            <VulnerableLoginApp 
              challenge={activeChallenge}
              onLoginAttempt={handleLoginAttempt}
            />
          </div>
          
          {/* Right Column - AI Assistant */}
          <div className="lg:col-span-4">
            <AIAssistant 
              challenge={activeChallenge}
              lastAttempt={lastAttempt}
              context={aiContext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlSandbox;
