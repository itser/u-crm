import { IsOptional, IsString } from 'class-validator';

export class FindManyQueryDto {
    @IsOptional()
    @IsString()
    filter?: string;  // The filter parameter is expected to be a string (JSON string)

    @IsOptional()
    @IsString()
    range?: string;   // The range parameter is expected to be a string (JSON string)

    @IsOptional()
    @IsString()
    sort?: string;    // The sort parameter is expected to be a string (JSON string)
}