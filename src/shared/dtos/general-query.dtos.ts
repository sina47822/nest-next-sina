import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive, IsString } from "class-validator";

export enum Sort {
    Title = 'title',
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt'
}
export class GeneralQueryDto {
    @ApiPropertyOptional({ type: Number, default: 1 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number;

    @ApiPropertyOptional({ type: Number, default: 10 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ enum: Sort })
    @IsOptional()
    @IsEnum(Sort)
    sort?: Sort;
}