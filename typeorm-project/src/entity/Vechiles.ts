import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";
export enum Type {CAR = "car", WATERCRAFT = "watercraft"};
export enum Fuel {NONE = "none", PETROL = "petrol", DIESEL = "diesel"};

@Entity({ name: "vechiles" })
export class Vechiles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    platenumber: string

    @Column()
    chassisnumber: string

    @Column()
    date: string

    @Column()
    name: string

    @Column()
    brand: string

    @Column()
    status: string

    @Column()
    type: Type

    @Column()
    price: number

    @Column()
    kilometers: number

    @Column()
    fuel: Fuel

    @ManyToOne(() => User, user => user.vechiles, {  eager: true,

    })
    users: User;

    static convertToDto(v: Vechiles) {
        return {
            id: v.id,
            platenumber: v.platenumber,
            chassisnumber: v.chassisnumber,
            date: v.date,
            name: v.name,
            brand: v.brand,
            type: v.type,
            status: v.status,
            price: v.price,
            kilometers: v.kilometers,
            fuel: v.fuel
        }
    }
}
