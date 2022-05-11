import {Vechile} from "./Vechile";

export class User{
  id!: number;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  address!: string;
  permission!: string;
  vechiles!: Vechile[];
}

export enum Role {Person = "person", Company = "company"};
