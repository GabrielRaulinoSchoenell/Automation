import express from 'express';
import main from './routes/main';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.text({type: 'application/xml', limit: '10mb'}))

server.use(main);


server.listen(3000, ()=>{
    console.log('rodando...')
})