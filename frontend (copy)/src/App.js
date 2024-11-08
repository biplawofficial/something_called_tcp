import React, { useState } from "react";
import "./App.css";

// Import Ace Editor core
import AceEditor from "react-ace";
import ace from "ace-builds";
import "ace-builds/webpack-resolver";

// Import specific mode and theme
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/ext-language_tools";

// Import additional required modules
// import "ace-builds/src-noconflict/snippets/c_cpp";

function App() {
  const [tcode, setTcode] = useState(
    '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    cout<<"Hello, Folk!";\n    return 0;\n}'
  );
  const [response, setResponse] = useState(null);
  const [cinput, setcinput] = useState("");

  const runhandler = async () => {
    try {
      const req = await fetch("http://localhost:3001/cpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpp_code: tcode }),
      });
      const mess = await req.json();
      setResponse(mess.output);
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  return (
    <div className="app">
      <h2>Onichiva Code Editor</h2>
      <div className="code-editor">
        <AceEditor
          mode="c_cpp"
          theme="monokai"
          value={tcode}
          onChange={(newCode) => setTcode(newCode)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{
            width: "100%",
            height: "300px",
            fontSize: "14px",
          }}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          wrapEnabled={true}
        />
      </div>
      <div className="input-section">
        <h4>Custom input</h4>
        <textarea
          value={cinput}
          onChange={(e) => setcinput(e.target.value)}
          rows={5}
          placeholder="Enter a for apple b for ball"
        />
      </div>

      <button onClick={runhandler} className="run-button">
        Run
      </button>
      <div className="output-section">
        <h4>Output</h4>
        <pre>{response || " output on the way..."}</pre>
      </div>
    </div>
  );
}

export default App;
