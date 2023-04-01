import express from 'express';
import main from './routes/main';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({extended: true}));


server.use(main);

server.listen(3000, ()=>{
    console.log('rodando...')
})