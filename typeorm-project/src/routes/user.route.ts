import {Router} from "express";
import { DataSource } from "typeorm";
import { UserService } from "../services/user.service";

export function getUserRoute(dataSource:DataSource){
    const router = Router();
    const userService = new UserService(dataSource);

    router.get('/listAll',userService.getAll);
    router.get('/get',userService.getAllWithVechiles);
    router.post('/create', userService.createUser);
    router.delete('/delete/:id',userService.deleteUserById);
    router.post('/add-vechile',userService.addVechile);
    router.delete('/delete-vechile',userService.deleteVechile);
    router.post('/get-user',userService.getUser);
    router.patch('/update-user',userService.update);
    return router;
}