import { IsNotEmpty, IsString, IsArray,  } from "class-validator";
import { UserEntity } from "./user.entity";
import { PostRO } from "src/posts/post.dto";
import { FollowerEntity } from "src/followers/follower.entity";

export class UserDTO {

    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    email : string;

    @IsString()
    @IsNotEmpty()
    address : string;

    @IsString()
    phone : string;

    @IsString()
    roles : string;

    @IsString()
    avatar : string;
}

export class UserRO {
    id: string;
    created_at: Date;
    username: string;
    name: string;
    email: string;
    avatar : string;
    phone: string;
    roles :string;    
    followers: FollowerEntity[];
    following: FollowerEntity[];
    followPosts: PostRO[]
}
