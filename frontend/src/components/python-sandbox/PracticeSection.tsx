import { useState } from "react";
import { Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeEditor } from "./CodeEditor";

interface PracticeSectionProps {
  onExecute: () => void;
}

const defaultCode = `import os

def ping_host(host):
    # Vulnerable: User input directly passed to shell
    command = f"ping -c 1 {host}"
    result = os.system(command)
    return result

# User-controlled input
user_input = input("Enter host to ping: ")
ping_host(user_input)`;

export const PracticeSection = ({ onExecute }: PracticeSectionProps) => {
  const [code, setCode] = useState(defaultCode);
  const [userInput, setUserInput] = useState("google.com; cat /etc/passwd");
  const [output, setOutput] = useState("");

  const handleExecute = () => {
    // Simulate execution output
    setOutput(
      `$ ping -c 1 google.com; cat /etc/passwd
PING google.com (142.250.185.238): 56 data bytes
64 bytes from 142.250.185.238: icmp_seq=0 ttl=117 time=12.3 ms

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...

⚠️ SECURITY VULNERABILITY DETECTED:
Command injection allowed reading /etc/passwd`
    );
    onExecute();
  };

  return (
    <div className="bg-cyber-bg-card cyber-border rounded-lg p-6 cyber-glow">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="w-6 h-6 text-cyber-accent" />
        <h2 className="text-xl font-bold text-cyber-text">
          Vulnerable Python Application
        </h2>
      </div>

      <div className="space-y-6">
        {/* Code Editor */}
        <div>
          <label className="block text-sm font-medium text-cyber-text-muted mb-2">
            Python Code
          </label>
          <CodeEditor code={code} onChange={(val) => setCode(val || "")} />
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-medium text-cyber-text-muted mb-2">
            User Input (Test Payload)
          </label>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter test input..."
            className="bg-cyber-bg border-cyber-border text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-accent focus:ring-cyber-accent/20"
          />
        </div>

        {/* Execute Button */}
        <Button
          onClick={handleExecute}
          className="w-full bg-cyber-accent hover:bg-cyber-accent-glow text-cyber-bg font-semibold py-3 transition-all duration-300 hover:shadow-[0_0_30px_hsl(175,80%,50%,0.5)]"
        >
          <Play className="w-4 h-4 mr-2" />
          Execute
        </Button>

        {/* Output Area */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
              Output
            </label>
            <pre className="bg-cyber-bg p-4 rounded-lg cyber-border text-sm font-mono text-cyber-text whitespace-pre-wrap overflow-x-auto max-h-[200px] overflow-y-auto">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
