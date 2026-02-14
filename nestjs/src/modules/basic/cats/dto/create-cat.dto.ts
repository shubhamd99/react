import { IsInt, IsString, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsString()
  breed: string;
}
