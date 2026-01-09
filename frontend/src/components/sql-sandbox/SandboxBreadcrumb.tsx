import { Link } from "react-router-dom";

export const SandboxBreadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-mono">
      <Link 
        to="/" 
        className="text-primary hover:text-primary/80 transition-colors cyber-glow-hover px-2 py-1"
      >
        WebAttack Sandbox
      </Link>
      <span className="text-muted-foreground">/</span>
      <span className="text-foreground border-b border-dashed border-primary px-2 py-1">
        SQL Sandbox
      </span>
      <span className="text-muted-foreground">/</span>
      <Link 
        to="/python-sandbox" 
        className="text-muted-foreground hover:text-primary transition-colors px-2 py-1"
      >
        Python Sandbox
      </Link>
    </nav>
  );
};
