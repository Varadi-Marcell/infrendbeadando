import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Vechiles } from "./entity/Vechiles";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root20000218",
    database: "root",
    dropSchema: false,
    synchronize: true,
    logging: ['query'],
    entities: [User,Vechiles],
    migrations: [],
    subscribers: [],
})
