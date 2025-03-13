import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UploadFileDto {  
    @ApiPropertyOptional({ type: String })
    @IsOptional()
    folder?: string;

    @ApiPropertyOptional({ type: Number })
    @IsOptional()
    height?: number;

    @ApiPropertyOptional({ type: Number })
    @IsOptional()
    width?: number;

}