import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertCircle, Shield, Loader2 } from "lucide-react";
import type { Challenge } from "@/pages/SqlSandbox";

interface AIAssistantProps {
  challenge: Challenge;
  lastAttempt: { username: string; password: string; success: boolean } | null;
  context: string;
}

type QueryType = "help" | "why-fail" | "how-fix";

const getLocalResponse = (type: QueryType, challenge: Challenge, lastAttempt: AIAssistantProps["lastAttempt"]): string => {
  if (type === "help") {
    if (challenge.level === 1) {
      return `🎯 SQL Injection Level 1 Hints:

• SQL injection exploits unsanitized user input in database queries
• Think about how a login query might look:
  SELECT * FROM users WHERE username='[input]' AND password='[input]'
• What if you could manipulate the query logic?
• Try using special characters like ' or "
• The goal is to make the WHERE clause always true

💡 Classic pattern: ' OR '1'='1`;
    }
    return `🎯 SQL Injection Level 2 Hints:

• This level requires more specific injection techniques
• Comment syntax (--) can be useful to ignore parts of a query
• Try targeting specific usernames like 'admin'
• UNION SELECT can extract data from other tables

💡 Think about: admin'-- or UNION SELECT`;
  }

  if (type === "why-fail") {
    if (!lastAttempt) {
      return "No login attempt recorded yet. Try entering some credentials first!";
    }
    if (lastAttempt.success) {
      return `✅ Your last attempt actually succeeded!

You used: "${lastAttempt.username}"
The SQL injection was detected and the authentication was bypassed.`;
    }
    return `❌ Login Failed Analysis:

Your input: "${lastAttempt.username}"
${challenge.level === 1 
  ? `This didn't trigger SQL injection because:
• No SQL special characters detected
• The query logic wasn't manipulated

Try adding ' OR '1'='1 to your input`
  : `Level 2 requires specific patterns:
• Try using comment syntax: admin'--
• Or UNION-based injection

Your input didn't match the required patterns.`}`;
  }

  if (type === "how-fix") {
    return `🔒 How to Prevent SQL Injection:

1. **Parameterized Queries (Prepared Statements)**
   Use placeholders instead of string concatenation:
   \`\`\`sql
   SELECT * FROM users WHERE username = ? AND password = ?
   \`\`\`

2. **Input Validation**
   • Whitelist allowed characters
   • Reject or escape special characters
   • Validate input length

3. **ORM Usage**
   Use frameworks that handle escaping automatically

4. **Least Privilege**
   Database accounts should have minimal permissions

5. **Web Application Firewall (WAF)**
   Can detect and block common injection patterns`;
  }

  return "Select an option to get AI assistance.";
};

export const AIAssistant = ({ challenge, lastAttempt, context }: AIAssistantProps) => {
  const [response, setResponse] = useState<string>("AI response shows here");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (type: QueryType) => {
    setIsLoading(true);
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const aiResponse = getLocalResponse(type, challenge, lastAttempt);
    setResponse(aiResponse);
    setIsLoading(false);
  };

  return (
    <div className="border border-dashed border-foreground p-6 animate-fade-in">
      <h2 className="text-lg font-bold mb-4 text-foreground">AI Assistant</h2>
      
      <div className="flex flex-col gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => handleQuery("help")}
          disabled={isLoading}
          className="justify-start border-dashed border-foreground/30 hover:border-primary hover:text-primary cyber-glow-hover"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Ask for help
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleQuery("why-fail")}
          disabled={isLoading}
          className="justify-start border-dashed border-foreground/30 hover:border-primary hover:text-primary cyber-glow-hover"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Why did login fail?
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleQuery("how-fix")}
          disabled={isLoading}
          className="justify-start border-dashed border-foreground/30 hover:border-primary hover:text-primary cyber-glow-hover"
        >
          <Shield className="w-4 h-4 mr-2" />
          How to fix?
        </Button>
      </div>
      
      <div className="border border-dashed border-foreground/30 p-4 min-h-[200px] bg-secondary/30">
        {isLoading ? (
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-mono text-sm">Processing...</span>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground leading-relaxed">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
};
