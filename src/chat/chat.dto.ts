import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class ChatDTO {

    @IsString()
    sender : string;

    @IsString()
    message : string;

    @IsString()
    room : string;
}

export class ChatRO {
    id? : string;
    sender: string;
    message: string;
    room: string;
}
