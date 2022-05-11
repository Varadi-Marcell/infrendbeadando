import {Router} from "express";
import { DataSource } from "typeorm";
import {VechilesService} from "../services/vechiles.service";

export function getVechilesRoute(dataSource:DataSource){
    const router = Router();
    const vechilesService = new VechilesService(dataSource);

    router.get('/listvechiles',vechilesService.getAll);
    router.post('/createvechile', vechilesService.createVechile);
    router.delete('/deletevechile/:id',vechilesService.deleteVechileById);
    router.post('/getvechile',vechilesService.getVechile);
    router.patch('/update-vechile',vechilesService.update);
    router.post('/get-vechile-platenumber',vechilesService.getVechilePlatenumber);
    return router;
}