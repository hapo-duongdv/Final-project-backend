import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { UserRO } from "src/users/user.dto";

export class PostDTO {

    @IsString()
    title : string;

    @IsString()
    description : string;

    @IsString()
    status : string;

    @IsString()
    category : string;

    @IsString()
    address : string;

    @IsNotEmpty()
    cost : string;

    @IsNotEmpty()
    isShow : boolean;

    @IsNotEmpty()
    imgUrl : string;
}

export class PostRO {
    id? : string;
    updated_at: Date;
    created_at : Date;
    title: string;
    isShow : boolean;
    description: string;
    status: string;
    address: string;
    imgUrl : string;
    cost: string;
    category: string;
    author: UserRO;
}
