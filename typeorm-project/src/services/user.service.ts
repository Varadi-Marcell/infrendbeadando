import {Request, Response} from "express";
import {DataSource, Repository} from "typeorm";
import {User} from "../entity/User";
import {validate} from "class-validator";
import {CreateUserCommand, CreateUserCommand2} from "../command/CreateUserCommand";
import {Vechiles} from "../entity/Vechiles";

export class UserService {
    private repository: Repository<User>
    private vechilerepository: Repository<Vechiles>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
        this.vechilerepository = dataSource.getRepository(Vechiles);

    }

    getAll = async (req: Request, res: Response) => {
        try {
            const entities = (await this.repository.find()).map((value) => {
                return {
                    id: value.id,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    age: value.age,
                    email: value.email,
                    address: value.address,
                    permission: value.permission,
                    vechiles: value.vechiles
                }
            });
            res.json(entities);
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async(req: Request, res: Response) => {
        try {
            const user = await this.repository.findOneBy({id: req.body.id});
            console.log(user)
            res.json(User.addVechile(user));
        } catch (error) {
            return console.log(error,"Not found",404);
        }
    }

    getAllWithVechiles = async (req, res) => {
        try {
            const entities = await this.repository.createQueryBuilder("user")
                .leftJoinAndSelect("user.vechiles", "vechiles")
                .getMany();
            res.json(entities);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        }

    }

    deleteUserById = async (req: Request, res: Response) => {
        const userId = req.params.id;
        console.log(req.params.id);
        if(!userId){
            return console.log("not found",userId);
        }
        const userIdExists = await this.repository.findOneBy({id: Number(userId)});
        console.log(userIdExists);
        if(!userIdExists){
            return console.log(res,"User not exists",404);
        }
        try {
            const deleteUser = await this.repository.delete(userIdExists);
            console.log("Deleted user:",deleteUser);
            res.json({message: "User deleted from the database"});
        } catch (error) {
            console.log(error)
        }
    }


    addVechile = async (req: Request, res: Response) => {
        const user = await this.repository.findOneBy({id: req.body.userId});
        if (!user) {
            return console.log(res, "User not exists", 404);
        }
        console.log(req.body.vechileId.length);
        try {
            for (let i = 0; i<req.body.vechileId.length;i++) {
                const j = req.body.vechileId[i];
                await this.vechilerepository.createQueryBuilder()
                    .update(Vechiles)
                    .set({
                        status: "No",
                        users: user,
                    })
                    .where("id = :id", {id: j})
                    .execute();
            }
        } catch (error ) {
            res.status(500).json({error: error.message});
            return console.log(res, "AddVechile Failed");
        }
    }


    deleteVechile = async ( req: Request, res: Response ) =>{
        const user = await this.repository.findOneBy({id: req.body.userId});
        const vechile = await this.vechilerepository.findOneBy({id: req.body.vechileId});

        const kilometer = req.body.kilometer;

        console.log(vechile);
        console.log(user.vechiles);

        try {
            await  this.vechilerepository.createQueryBuilder()
                .update(Vechiles)
                .set({
                    users : null,
                    status : "Yes"
                })
                .where("id=:id",{id:req.body.vechileId})
                .execute();


        } catch (error ) {
            res.status(500).json({error: error.message});
            return console.log(res, "Delete Failed");
        }
    }

    createUser = async (req: Request, res: Response) => {
        const command = req.body;
        const u = new CreateUserCommand2();
        u.age = command.age;
        u.firstName = command.firstName;
        u.lastName = command.lastName;
        u.email = command.email;
        u.address = command.address;
        u.permission = command.permission;

        try{
            validate(u).then(async errors => {
                if (errors.length > 0) {
                    console.log(u);
                    console.log(errors);
                    res.status(400).json({message: "Rossz input"});
                    console.log("NEM JO");
                } else {
                    const user = await this.repository.save({
                        age: command.age,
                        firstName: command.firstName,
                        lastName: command.lastName,
                        email: command.email,
                        address: command.address,
                        permission: command.permission
                    });

                    res.json(User.convertToDto(user));
                }
            })
        }catch (err){
            console.log(err);
        }

    }

    update = async (req: Request, res: Response) => {
        const command = req.body;
        const u = new CreateUserCommand();
        u.id = command.id;
        u.age = command.age;
        u.firstName = command.firstName;
        u.lastName = command.lastName;
        u.email = command.email;
        u.address = command.address;
        u.permission = command.permission;

        validate(u).then(async errors => {
            if (errors.length > 0) {
                console.log(u);
                res.status(400).json({message: "Rossz input"});
            } else {
                const user = await this.repository.save({
                    id: command.id,
                    age: command.age,
                    firstName: command.firstName,
                    lastName: command.lastName,
                    email: command.email,
                    address: command.address,
                    permission: command.permission
                });

                res.json(User.convertToDto(user));
            }
        })
    }
}
