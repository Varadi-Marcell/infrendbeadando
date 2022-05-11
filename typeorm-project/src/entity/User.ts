import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Vechiles} from "./Vechiles";
export enum Permission {Person = "person", Company = "company"};

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    permission: Permission

    @OneToMany(() => Vechiles, vechiles => vechiles.users , {
            //cascade: true,
        //onUpdate:'CASCADE'
            //eager: true

    })
    vechiles: Vechiles[];

    static convertToDto(u: User) {
        return {
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            age: u.age,
            email: u.email,
            address: u.address,
            permission: u.permission
        }
    }
    static addVechile(u: User) {
        return {
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            age: u.age,
            email: u.email,
            address: u.address,
            permission: u.permission,
            vechiles: u.vechiles
        }
    }

}
