import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { FollowerEntity } from "src/followers/follower.entity";
import { UserEntity } from "src/users/user.entity";
import { UserRO } from "src/users/user.dto";

export class FollowerDTO {
    
    @IsString()
    id : string;
}

export class FollowerRO {
    id: string;
    updated_at: Date;
    created_at: Date;
    followers: UserEntity[];
    following: UserEntity[];
}
