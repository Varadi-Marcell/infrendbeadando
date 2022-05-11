import {IsEmail, IsNumber, IsOptional, IsString, Matches} from "class-validator";
import {Permission} from "../entity/User";

export class CreateUserCommand {

    @IsNumber()
    id: number
    @IsNumber()
    age: number
    @IsString()
    firstName: string;
    @IsString()
    lastName: number;
    @IsEmail()
    email: string;
    @IsString()
    address:string;
    @IsOptional()
    @Matches(`^${Object.values(Permission).filter(v => typeof v !== "number").join('|')}$`, 'i')
    permission: Permission;

}

export class CreateUserCommand2 {

    @IsNumber()
    age: number
    @IsString()
    firstName: string;
    @IsString()
    lastName: number;
    @IsEmail()
    email: string;
    @IsString()
    address:string;
    @IsOptional()
    @Matches(`^${Object.values(Permission).filter(v => typeof v !== "number").join('|')}$`, 'i')
    permission: Permission;

}