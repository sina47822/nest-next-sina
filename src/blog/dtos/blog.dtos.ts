import { IsNotEmpty, IsString } from "class-validator";

export class BlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
    @IsString()
    @IsNotEmpty()
    image: string;
    @IsString()
    @IsNotEmpty()
    category: string;
}