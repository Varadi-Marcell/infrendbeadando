import { AppDataSource } from "./data-source"
import * as express from 'express';
import * as cors from 'cors';
import { getUserRoute } from "./routes/user.route";
import { DataSource } from "typeorm";
import {getVechilesRoute} from "./routes/vechiles.route";
AppDataSource.initialize().then(async (dataSource:DataSource) => {

    const app = express();

    app.use(cors());
    app.use(express.json());
    
    app.use('/api/user',getUserRoute(dataSource));
    app.use('/api/vechiles',getVechilesRoute(dataSource));

    const port = process.env.port || 3000;
    app.listen(port,()=>{
        console.log('Server is listening on port:',port);
    });


}).catch(error => console.log(error))
