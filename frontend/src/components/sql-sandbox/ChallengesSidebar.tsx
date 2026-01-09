import type { Challenge } from "@/pages/SqlSandbox";

interface ChallengesSidebarProps {
  challenges: Challenge[];
  activeChallenge: Challenge;
  onSelectChallenge: (challenge: Challenge) => void;
}

export const ChallengesSidebar = ({ 
  challenges, 
  activeChallenge, 
  onSelectChallenge 
}: ChallengesSidebarProps) => {
  return (
    <div className="border border-dashed border-foreground p-4 animate-fade-in">
      <h2 className="text-lg font-bold mb-4 text-foreground">Challenges</h2>
      <ul className="space-y-2">
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <button
              onClick={() => onSelectChallenge(challenge)}
              className={`w-full text-left px-3 py-2 transition-all duration-200 font-mono text-sm
                ${activeChallenge.id === challenge.id 
                  ? "text-primary border-l-2 border-primary bg-primary/10 cyber-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              {challenge.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
