import net from 'net';
const PORT= 3000


const server=net.createServer((socket) =>
{
    console.log("Hello there new client :)");
    socket.on('data',(data)=>
    {
        const mg=data.toString().trim();
        const part=mg.split(" ")
        if(part[0]=='add'&& (!isNaN(part[1]) && !isNaN(part[2])))
        {
            const a=parseFloat(part[1]);
            const b=parseFloat(part[2]);
            socket.write(`Here you go : ${a+b} \n`);
    
        }
        else if(part[0]=='sub'&& (!isNaN(part[1]) && !isNaN(part[2])))
        {
            const a=parseFloat(part[1]);
            const b=parseFloat(part[2]);
            socket.write(`Here you go : ${a-b} \n`);
        }
        else if(part[0]=='mul'&& (!isNaN(part[1]) && !isNaN(part[2])))
            {
                const a=parseFloat(part[1]);
                const b=parseFloat(part[2]);
                socket.write(`Here you go : ${a*b} \n`);
            }
        else if(part[0]=='div' && (!isNaN(part[1]) && !isNaN(part[2])))
                {
                    const a=parseFloat(part[1]);
                    const b=parseFloat(part[2]);
                    if(b==0)
                        socket.write(`WTF do you want me to go into infinite loop, you suck dont you whatever your answer is infinite\n`);
                    else
                    socket.write(`Here you go : ${a/b} \n`);
                }
        else
            socket.write("you fucking imposter\n");

    });


    socket.on('end',()=>
    {
        const a="Lunch Break";
        const b="Dont come back <:>"
        const options = [a,b];

        const randomIndex = Math.floor(Math.random() * options.length);
        console.log(options[randomIndex]);
    })
})
server.listen(PORT,()=>
{
    console.log(`server is listening at localhost:${PORT}`)
})