import { X, Bot, AlertTriangle, Shield, Wrench } from "lucide-react";

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  vulnerabilityType: string;
}

const aiResponses: Record<string, { why: string; exploit: string; fix: string }> = {
  "command-injection": {
    why: "The code directly passes user input to a shell command using os.system() or subprocess without any sanitization. This allows attackers to inject additional commands by using shell metacharacters like `;`, `|`, `&&`, or backticks.",
    exploit: "An attacker can input something like `; rm -rf /` or `| cat /etc/passwd` to execute arbitrary commands on the server. They could steal sensitive data, install malware, create backdoors, or completely compromise the system.",
    fix: "1. Never use os.system() with user input\n2. Use subprocess with shell=False and pass arguments as a list\n3. Implement strict input validation using allowlists\n4. Use shlex.quote() to escape shell arguments if shell is necessary\n5. Run with minimal privileges and in sandboxed environments",
  },
  "insecure-deserialization": {
    why: "The code uses pickle.loads() on untrusted data. Python's pickle module can execute arbitrary code during deserialization, making it extremely dangerous when processing user-supplied data.",
    exploit: "An attacker can craft a malicious pickle payload that, when deserialized, executes arbitrary Python code. This could include reverse shells, file system access, or any Python operation the process has permissions for.",
    fix: "1. Never unpickle data from untrusted sources\n2. Use safe serialization formats like JSON for data exchange\n3. If pickle is required, use cryptographic signatures to verify data integrity\n4. Consider using restricted unpicklers with find_class() overrides\n5. Implement strict type checking on deserialized objects",
  },
  "path-traversal": {
    why: "The code constructs file paths using user input without validating or sanitizing the path components. Attackers can use sequences like `../` to navigate outside the intended directory.",
    exploit: "An attacker can input paths like `../../../etc/passwd` or `..\\..\\windows\\system32\\config\\sam` to read sensitive system files, configuration files with credentials, or other users' data.",
    fix: "1. Use os.path.basename() to extract only the filename\n2. Validate paths with os.path.realpath() and verify they start with the expected base directory\n3. Implement strict allowlist for allowed characters in filenames\n4. Use pathlib for safer path manipulation\n5. Run with minimal file system permissions",
  },
  "unsafe-file-upload": {
    why: "The code accepts file uploads without properly validating file type, content, or sanitizing filenames. This allows attackers to upload malicious files that could be executed by the server.",
    exploit: "An attacker can upload a Python/PHP/shell script disguised as an image, overwrite existing files using directory traversal in filenames, or upload files with double extensions like `shell.php.jpg` that might be executed.",
    fix: "1. Validate file content using magic bytes, not just extensions\n2. Generate random filenames instead of using user-provided names\n3. Store uploads outside the web root\n4. Set proper file permissions (no execute)\n5. Use content-type validation and virus scanning\n6. Implement file size limits",
  },
};

export const AIAssistantPanel = ({
  isOpen,
  onClose,
  vulnerabilityType,
}: AIAssistantPanelProps) => {
  const response = aiResponses[vulnerabilityType] || aiResponses["command-injection"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-cyber-bg-card border-l border-cyber-border shadow-2xl z-50 animate-slide-in-right">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyber-accent/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyber-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-cyber-text">AI Security Assistant</h3>
              <p className="text-xs text-cyber-text-muted">Vulnerability Analysis</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-cyber-border/50 rounded-lg transition-colors"
            aria-label="Close AI Assistant Panel"
            title="Close"
          >
            <X className="w-5 h-5 text-cyber-text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Why Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyber-accent">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-semibold">Why did this error occur?</h4>
            </div>
            <p className="text-sm text-cyber-text leading-relaxed pl-7">
              {response.why}
            </p>
          </div>

          {/* Exploit Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyber-error">
              <Shield className="w-5 h-5" />
              <h4 className="font-semibold">How can an attacker exploit it?</h4>
            </div>
            <p className="text-sm text-cyber-text leading-relaxed pl-7">
              {response.exploit}
            </p>
          </div>

          {/* Fix Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-400">
              <Wrench className="w-5 h-5" />
              <h4 className="font-semibold">How to fix securely?</h4>
            </div>
            <pre className="text-sm text-cyber-text leading-relaxed pl-7 whitespace-pre-wrap font-sans">
              {response.fix}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cyber-border">
          <p className="text-xs text-cyber-text-muted text-center">
            AI-powered security analysis • WebAttack Sandbox
          </p>
        </div>
      </div>
    </div>
  );
};
