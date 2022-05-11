import {IsDate, IsDateString, IsEmail, IsNumber, IsOptional, IsString, Matches} from "class-validator";
import {Fuel, Type} from "../entity/Vechiles";

export class CreateVechilesCommand {

    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    platenumber: string;

    @IsString()
    chassisnumber: string;

    @IsDateString()
    date: string;

    @IsString()
    name: string;

    @IsString()
    brand: string;

    @IsOptional()
    @Matches(`^${Object.values(Type).filter(v => typeof v !== "number").join('|')}$`, 'i')
    type: Type;

    @IsNumber()
    price: number;

    @IsNumber()
    kilometers: number;

    @IsString()
    status: string;

    @IsOptional()
    @Matches(`^${Object.values(Fuel).filter(v => typeof v !== "number").join('|')}$`, 'i')
    fuel: Fuel;



}
