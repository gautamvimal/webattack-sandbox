import { Bot } from "lucide-react";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export const FloatingAIButton = ({ onClick }: FloatingAIButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-cyber-accent flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 pulse-glow z-40"
      aria-label="Open AI Assistant"
    >
      <Bot className="w-6 h-6 text-cyber-bg" />
    </button>
  );
};
