import { VulnerabilityCard } from "./VulnerabilityCard";

const vulnerabilities = [
  {
    title: "Command Injection",
    explanation:
      "Command injection occurs when an application passes unsafe user-supplied data to a system shell. The attacker can append malicious commands using shell metacharacters, leading to arbitrary command execution.",
    vulnerableCode: `import os

def run_command(user_input):
    # VULNERABLE: Direct shell execution
    os.system(f"echo {user_input}")

run_command("; rm -rf /")  # Malicious input`,
    whatGoesWrong:
      "The attacker can terminate the intended command with `;` and inject any arbitrary command. This gives them full control over the server, allowing data theft, system destruction, or backdoor installation.",
    secureFix: `import subprocess
import shlex

def run_command_safe(user_input):
    # SECURE: Use subprocess with shell=False
    # and validate/sanitize input
    sanitized = shlex.quote(user_input)
    subprocess.run(["echo", sanitized], shell=False)`,
  },
  {
    title: "Insecure Deserialization",
    explanation:
      "Python's pickle module can deserialize malicious objects that execute arbitrary code. Never unpickle data from untrusted sources.",
    vulnerableCode: `import pickle
import base64

def load_user_data(data):
    # VULNERABLE: Unpickling user input
    decoded = base64.b64decode(data)
    return pickle.loads(decoded)

# Attacker sends crafted pickle payload`,
    whatGoesWrong:
      "Attackers can craft pickle payloads that execute code during deserialization. The __reduce__ method can be exploited to run arbitrary functions, including os.system() for remote code execution.",
    secureFix: `import json

def load_user_data_safe(data):
    # SECURE: Use JSON for data exchange
    return json.loads(data)

# Or use cryptographic signatures
import hmac
def load_verified_pickle(data, signature, key):
    expected = hmac.new(key, data, 'sha256').hexdigest()
    if not hmac.compare_digest(signature, expected):
        raise ValueError("Invalid signature")
    return pickle.loads(data)`,
  },
  {
    title: "Path Traversal",
    explanation:
      "Path traversal vulnerabilities allow attackers to access files outside the intended directory by manipulating file paths with sequences like '../'.",
    vulnerableCode: `def read_file(filename):
    # VULNERABLE: No path validation
    base_path = "/var/www/uploads/"
    file_path = base_path + filename
    with open(file_path, 'r') as f:
        return f.read()

read_file("../../../etc/passwd")  # Malicious`,
    whatGoesWrong:
      "An attacker can use '../' sequences to escape the uploads directory and read sensitive system files like /etc/passwd, configuration files with credentials, or application source code.",
    secureFix: `import os
from pathlib import Path

def read_file_safe(filename):
    base_path = Path("/var/www/uploads/").resolve()
    # Get only the filename, strip any path
    safe_name = os.path.basename(filename)
    file_path = (base_path / safe_name).resolve()
    
    # Verify the path is within base directory
    if not str(file_path).startswith(str(base_path)):
        raise ValueError("Invalid file path")
    
    with open(file_path, 'r') as f:
        return f.read()`,
  },
  {
    title: "Unsafe File Upload",
    explanation:
      "Improper file upload validation can allow attackers to upload malicious scripts, overwrite existing files, or store files with dangerous content.",
    vulnerableCode: `def upload_file(file):
    # VULNERABLE: No validation
    filename = file.filename  # User-controlled
    file.save(f"/uploads/{filename}")
    
# Attacker uploads: "../../app.py" 
# or "shell.py"`,
    whatGoesWrong:
      "Attackers can upload executable scripts that the server might run, overwrite critical files using path traversal in filenames, or upload malware that affects other users who download the files.",
    secureFix: `import uuid
import magic  # python-magic library

ALLOWED_TYPES = {'image/jpeg', 'image/png', 'image/gif'}

def upload_file_safe(file):
    # Check actual file content type
    mime = magic.from_buffer(file.read(2048), mime=True)
    file.seek(0)
    
    if mime not in ALLOWED_TYPES:
        raise ValueError("Invalid file type")
    
    # Generate random filename
    ext = mime.split('/')[-1]
    safe_name = f"{uuid.uuid4()}.{ext}"
    
    # Save to separate storage directory
    file.save(f"/var/uploads/{safe_name}")`,
  },
];

export const DocumentationSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyber-text mb-6">
        Vulnerability Documentation
      </h2>
      {vulnerabilities.map((vuln) => (
        <VulnerabilityCard key={vuln.title} {...vuln} />
      ))}
    </div>
  );
};
