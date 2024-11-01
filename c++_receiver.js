import fs from 'fs'
import net from 'net'
const PORT=3001
const server=net.createServer((socket)=>
{
    const ws=fs.createWriteStream('cpp-received.cpp');
    socket.pipe(ws);
    ws.on('finish',()=>
    {
        console.log(`File Received successful saved as ${ws}`)
        socket.end();
    });
    socket.on('end',()=>
        {
            const a="Lunch Break";
            const b="Dont come back <:>";
            const options = [a,b];
    
            const randomIndex = Math.floor(Math.random() * options.length);
            console.log(options[randomIndex]);
        });
});
server.listen(PORT,()=>
{
    console.log(`listening on https://localhost:${PORT} \n`);
});