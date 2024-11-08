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
app.post("/cpp", (req, res) => {
  const code = req.body.cpp_code;
  console.log("Received code from client");
  console.log(req.ip);
  //saving as file
  //have to add the try catch block as wfsync dont have any callback funcn..
  fs.writeFileSync("codefile.cpp", code);
  //compiler
  exec(`g++ codefile.cpp -o a.out`, (error, stdout, stderr) => {
    if (error) {
      console.log("compile error");
      return res.status(500).send("Compile Error");
    }
    //  else return res.status(200).send("fucking yeah");
    exec(`./a.out`, (error, stdout, stderr) => {
      if (error) {
        console.log("error at last moment");
        return res.status(200).send(`error`);
      } else {
        console.log("fucking yeah");
        // return res.status(200).send(`done ${stdout}`);
        return res
          .status(200)
          .json({ message: "Program executed successfully", output: stdout });
      }
    });
  });
  //execution
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
