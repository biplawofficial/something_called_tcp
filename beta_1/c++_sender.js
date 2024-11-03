import fs from 'fs'
import net from 'net'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT=3001
const HOST="localhost"

const client=net.createConnection({host:HOST,port:PORT},()=>
{
    console.log('Client created')
    const filepath=path.join(__dirname, 'filetosend.cpp');
    const rs=fs.createReadStream(filepath)
    rs.pipe(client);
    rs.on('end',()=>
    {
        console.log('file send successful')
    });
})
client.on('data',(data)=>
{
    console.log(`server response: ${data.toString()}`);
    client.end();
});
client.on('end',()=>
{
    console.log(`Disconnected from laude ka server`);
})