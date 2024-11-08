import express from "express";
import path from "path";
import { exec, spawn } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

let childProcess = null;

// Endpoint to compile and start the C++ program
app.post("/cpp/init", (req, res) => {
  const code = req.body.cpp_code;
  fs.writeFileSync("codefile.cpp", code);

  // Compile the C++ code
  exec(`g++ codefile.cpp -o a.out`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ output: "Compile Error" });
    }

    // Spawn the compiled executable
    childProcess = spawn("./a.out");

    childProcess.stdout.on("data", (data) => {
      console.log(`Program Output: ${data}`);
    });

    childProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    res.status(200).json({ output: "Program started. Ready for input." });
  });
});

// Endpoint to send step-by-step input to the program
app.post("/cpp/step", (req, res) => {
  if (!childProcess) {
    return res.status(400).json({ output: "No active program. Start the program first." });
  }

  const input = req.body.input + "\n";
  childProcess.stdin.write(input);

  // Wait for the response from the program
  let output = "";
  childProcess.stdout.once("data", (data) => {
    output += data.toString();
    res.status(200).json({ output });
  });
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

