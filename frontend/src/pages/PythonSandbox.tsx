import { useState } from "react";
import { Shield } from "lucide-react";
import { DocumentationSection } from "@/components/python-sandbox/DocumentationSection";
import { PracticeSection } from "@/components/python-sandbox/PracticeSection";
import { SecurityErrorModal } from "@/components/python-sandbox/SecurityErrorModal";
import { AIAssistantPanel } from "@/components/python-sandbox/AIAssistantPanel";
import { FloatingAIButton } from "@/components/python-sandbox/FloatingAIButton";

const PythonSandbox = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const handleExecute = () => {
    setShowErrorModal(true);
  };

  const handleAskAI = () => {
    setShowErrorModal(false);
    setShowAIPanel(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Python Vulnerability Playground
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn and test real-world Python security vulnerabilities in a safe
            environment.
          </p>
        </header>

        {/* Documentation Section */}
        <section className="mb-16">
          <DocumentationSection />
        </section>

        {/* Practice Section */}
        <section className="max-w-3xl mx-auto">
          <PracticeSection onExecute={handleExecute} />
        </section>
      </div>

      {/* Floating AI Button */}
      <FloatingAIButton onClick={() => setShowAIPanel(true)} />

      {/* Security Error Modal */}
      <SecurityErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onAskAI={handleAskAI}
      />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
        vulnerabilityType="command-injection"
      />
    </div>
  );
};

export default PythonSandbox;