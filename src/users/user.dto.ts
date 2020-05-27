import { IsNotEmpty, IsString, IsArray,  } from "class-validator";
import { UserEntity } from "./user.entity";

export class UserDTO {

    @IsNotEmpty()
    username : string;

    @IsNotEmpty()
    password : string;

    @IsString()
    name : string;

    @IsString()
    email : string;

    @IsString()
    address : string;

    @IsString()
    phone : string;

    @IsString()
    roles : string;

    @IsString()
    listFollow: string
}

export class UserRO {
    id: string;
    created_at: Date;
    username: string;
    name: string;
    email: string;
    phone: string;
    roles :string;
    listFollow: string
}
