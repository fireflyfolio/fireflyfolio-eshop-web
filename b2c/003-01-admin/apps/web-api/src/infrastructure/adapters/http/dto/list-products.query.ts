import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListProductsQuery {
  @IsOptional() @IsString() q?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() brand?: string;

  @IsOptional() @Transform(({ value }) => Number(value)) minPrice?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) maxPrice?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) @Min(0) @Max(5) minRating?: number;

  @IsOptional() @IsIn(['price_asc', 'price_desc', 'new', 'popular']) sort?: 'price_asc' | 'price_desc' | 'new' | 'popular';

  @Transform(({ value }) => Number(value)) @IsInt() @Min(1) page: number = 1;
  @Transform(({ value }) => Number(value)) @IsInt() @Min(1) @Max(60) pageSize: number = 24;
}
