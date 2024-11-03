import express from "express";
import path from "path";
import { exec } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());
app.post("/cpp", (req, res) => {
  const code = req.body.cpp_code;
  console.log("Received code from client");
  //saving as file
  fs.writeFileSync("codefile.cpp", code, (err) => {
    if (err) {
      console.log("error in writing the file", err);
      return res.status(500).send("Error Writing File");
    }
  });
  //compiler
  exec(`g++ codefile.cpp -o a.out`, (error, stdout, stderr) => {
    if (error) {
      console.log("compile error");
      return res.status(500).send("Compile Error");
    }
    //  else return res.status(200).send("fucking yeah");
  });
  //execution
  exec(`./a.out`, (error, stdout, stderr) => {
    if (error) {
      console.log("error at last moment");
      return res.status(200).send(`error`);
    } else {
      console.log("fucking yeah");
      return res.status(200).send(`done ${stdout}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
