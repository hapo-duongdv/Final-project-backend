import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class NotificationDTO {

    @IsString()
    sender : string;

    @IsString()
    notification : string;

    @IsString()
    author : string;

    @IsString()
    receiver : string;
}

export class NotificationRO {
    id? : string;
    sender: string;
    notification: string;
    author: string;
    receiver: string;
}
