import express, { urlencoded } from "express";
import router from "./src/routes/index.js";
import bodyParser from "bodyParser";
import cors from "cors";

const app = express();
const port = 3000;

app.user(cors());

const {json, urlencoded} = bodyParser;
app.use(json());
app.usr(urlencoded({extends: false}));
app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    
})