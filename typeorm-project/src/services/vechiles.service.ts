import { Request, Response } from "express";
import { DataSource, Repository } from "typeorm";
import { validate } from "class-validator";
import {Vechiles} from "../entity/Vechiles";
import {CreateVechilesCommand} from "../command/CreateVechilesCommand";

export class VechilesService{
    private repository: Repository<Vechiles>
    constructor (dataSource: DataSource){
        this.repository = dataSource.getRepository(Vechiles);
    }

    getAll = async(req: Request, res: Response) => {
        try {
            const entities = (await this.repository.find()).map((value)=>{
                return {
                    id: value.id,
                    platenumber: value.platenumber,
                    chassisnumber: value.chassisnumber,
                    date: value.date,
                    name: value.name,
                    brand: value.brand,
                    type: value.type,
                    price: value.price,
                    status: value.status,
                    kilometers: value.kilometers,
                    fuel: value.fuel
                }
            });
            res.json(entities);
        } catch (error) {

        }
    }
    deleteVechileById = async (req: Request, res: Response) => {
        //paraméter hiba
        console.log("ASD");
        const vechileId = req.params.id;
        if(!vechileId || isNaN(vechileId)){
            return console.log("not found",vechileId,500);
        }
        const VechileIdExists = await this.repository.findOneBy({id: Number(vechileId)});
        if(!vechileId){
            return console.log(res,"Vechile not exists",404);
        }
        try {
            const deletedVechile = await this.repository.delete(87);
            console.log("Deleted Vechile:",deletedVechile);
            res.json(deletedVechile);
        } catch (error) {
            return console.log(res,"Delete Failed",500);
        }
    }

    getVechile = async(req: Request, res: Response) => {
        try {
            const vechile = await this.repository.findOneBy({id: req.body.id});
            console.log(vechile)
            res.json(Vechiles.convertToDto(vechile));
        } catch (error) {
            return console.log(error,"Not found",404);
        }
    }

    getVechilePlatenumber = async(req: Request, res: Response) => {
        try {
            const vechile = await this.repository.findOneBy({platenumber: req.body.platenumber});
            console.log(vechile)
            res.json(Vechiles.convertToDto(vechile));
        } catch (error) {
            return console.log(error,"Not found",404);
        }
    }

    update = async (req: Request, res: Response) => {

        const error = new Error('Error Message');
        const command = req.body;
        const v = new CreateVechilesCommand();

        v.id = command.id;
        v.platenumber = command.platenumber;
        v.chassisnumber = command.chassisnumber;
        v.date = command.date;
        v.name = command.name;
        v.brand = command.brand;
        v.type = command.type;
        v.price = command.price;
        v.status = command.status;
        v.fuel = command.fuel;
        v.kilometers = command.kilometers;

        validate(v).then(async errors => {
            if (errors.length > 0) {
                res.status(400).json({message: "Rossz input"});
                console.log(errors);
                console.log("NEM JO");
            } else {
                const vechile = await this.repository.save({
                    id : command.id,
                    platenumber: command.platenumber,
                    chassisnumber: command.chassisnumber,
                    date: command.date,
                    name: command.name,
                    brand: command.brand,
                    type: command.type,
                    price: command.price,
                    status: command.status,
                    fuel: command.fuel,
                    kilometers: command.kilometers
                });
                console.log(vechile);
                res.json(Vechiles.convertToDto(vechile));
            }
        })
    }


    createVechile = async (req: Request, res: Response) => {
        const error = new Error('Error Message');
        const command = req.body;
        const v = new CreateVechilesCommand();
        const vechileExists = await this.repository.findOneBy({platenumber: req.body.platenumber});

        if(vechileExists){
            return res.json({message:"Ilyen rendszám már létezik"})
        }

        v.platenumber = command.platenumber;
        v.chassisnumber = command.chassisnumber;
        v.date = command.date;
        v.name = command.name;
        v.brand = command.brand;
        v.type = command.type;
        v.price = command.price;
        v.status = command.status;
        v.fuel = command.fuel;
        v.kilometers = command.kilometers;

        validate(v).then(async errors => {
            if (errors.length > 0) {
                res.status(400).json({message: "Rossz input"});
                console.log(errors);
                console.log("NEM JO");
            } else {
                const vechile = await this.repository.save({
                    platenumber: command.platenumber,
                    chassisnumber: command.chassisnumber,
                    date: command.date,
                    name: command.name,
                    brand: command.brand,
                    type: command.type,
                    price: command.price,
                    status: command.status,
                    fuel: command.fuel,
                    kilometers: command.kilometers
                });
                console.log(vechile);
                res.json(Vechiles.convertToDto(vechile));
            }
        })
    }
}
