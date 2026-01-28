import { Shield } from "lucide-react";
import { DocumentationSection } from "@/components/python-sandbox/DocumentationSection";
import { PracticeSection } from "@/components/python-sandbox/PracticeSection";

const PythonSandbox = () => {
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
            Learn and test real-world Python security vulnerabilities in a safe environment.
          </p>
        </header>

        {/* Documentation Section */}
        <section className="mb-16">
          <DocumentationSection />
        </section>

        {/* Practice Section */}
        <section className="max-w-3xl mx-auto">
          <PracticeSection />
        </section>

      </div>
    </div>
  );
};

export default PythonSandbox;