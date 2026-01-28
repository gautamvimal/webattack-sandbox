import { useState } from "react";
import { Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeEditor } from "./CodeEditor";

const defaultCode = `import os

def ping_host(host):
    command = f"ping -c 1 {host}"
    os.system(command)

user_input = input("Enter host: ")
ping_host(user_input)
`;

export const PracticeSection = () => {
  const [code, setCode] = useState(defaultCode);
  const [userInput, setUserInput] = useState("google.com; cat /etc/passwd");
  const [output, setOutput] = useState("");

  const handleExecute = () => {
    setOutput(
`⚠️ SECURITY VULNERABILITY DETECTED

Command Injection allowed attacker to read sensitive system files.

Example:
/etc/passwd leaked successfully`
    );
  };

  return (
    <div className="border border-border rounded-xl p-6 bg-background">
      
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">
          Vulnerable Python Application
        </h2>
      </div>

      <div className="space-y-6">
        
        {/* Code Editor */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Python Code
          </label>
          <CodeEditor code={code} onChange={(val) => setCode(val || "")} />
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            User Input
          </label>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="bg-black text-white border-border placeholder:text-muted-foreground focus:border-primary"
            placeholder="Enter payload"
          />
        </div>

        {/* Execute Button */}
        <Button
          onClick={handleExecute}
          className="w-full"
        >
          <Play className="w-4 h-4 mr-2" />
          Execute
        </Button>

        {/* Output */}
        {output && (
          <pre className="bg-black text-white p-4 rounded-lg text-sm font-mono border border-border">
            {output}
          </pre>
        )}

      </div>
    </div>
  );
};
