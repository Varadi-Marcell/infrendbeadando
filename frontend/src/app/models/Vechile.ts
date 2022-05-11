export class Vechile{
  id!: number;
  platenumber!: string;
  chassisnumber!: string;
  date!: string;
  name! :string;
  brand!: string;
  type!: Type;
  price!: number;
  status!: Status;
  kilometers!: number;
  fuel!: Fuel;
}

export enum Type {CAR = "car", WATERCRAFT = "watercraft"};
export enum Fuel {NONE = "none", PETROL = "petrol", DIESEL = "diesel"};
export enum Status {Yes = "yes", No = "no", Outofservice = "outofservice"};



