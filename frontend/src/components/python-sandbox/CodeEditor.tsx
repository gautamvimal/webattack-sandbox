import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-[300px] rounded-lg overflow-hidden cyber-border-glow">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Consolas', monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          padding: { top: 16 },
        }}
      />
    </div>
  );
};
