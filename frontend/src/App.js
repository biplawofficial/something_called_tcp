import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // const code = {
  //   cpp_code: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
  // };
  const [tcode, setcode] = useState("");
  const [response, setresponse] = useState(null);
  const handler = async () => {
    const req = await fetch("http://localhost:3000/cpp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpp_code: tcode }),
    });
    const mess = await req.json();
    setresponse(mess.output);
  };
  const change = async (e) => {
    setcode(e.target.value);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Send C++ Code in JSON to Backend</h2>

      <textarea
        value={tcode}
        onChange={change}
        rows="10"
        cols="50"
        placeholder="Write your C++ code here"
      ></textarea>
      <br />
      <button onClick={handler}>Send C++ Code to Backend</button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h4>Response from Backend:</h4>
          <p>{response}</p>
          {response && <pre>{response.output}</pre>}
        </div>
      )}
    </div>
  );
}

export default App;
