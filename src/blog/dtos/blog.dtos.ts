import { IsNotEmpty, IsString } from "class-validator";

export class BlogDto {
    @IsString({message : "عنوان باید استرینگ باشد باشد"})
    @IsNotEmpty({message : "عنوان نباید خالی باشد"})
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
}