
import {spawn} from 'child_process'
import readline from 'readline'
// Set up readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Spawn a new child process (for demonstration, we'll use a simple Node.js process)
const child = spawn('node', ['-e', `
    process.stdin.on('data', (data) => {
        console.log("Child Process Output:", data.toString());
    });
`]);

// Handle data received from the child process
child.stdout.on('data', (data) => {
    console.log(`Received from child: ${data}`);
});

// Error handling
child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

// Take input infinitely and send it to the child process
const getInput = () => {
    rl.question('Enter input for child process (or "exit" to quit): ', (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log("Exiting...");
            child.kill();  // Terminate child process
            rl.close();    // Close readline interface
        } else {
            child.stdin.write(`${input}\n`);  // Send input to child process
            getInput();  // Continue taking input
        }
    });
};

// Start the input prompt
getInput();

