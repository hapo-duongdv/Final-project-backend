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

    @IsNotEmpty()
    cost : string;
}

export class PostRO {
    id? : string;
    updated_at: Date;
    created_at : Date;
    title: string;
    description: string;
    status: string;
    cost: string;
    category: string;
    author: UserRO;
}
