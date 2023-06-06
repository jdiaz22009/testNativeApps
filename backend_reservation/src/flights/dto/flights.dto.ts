import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class FlightsDto {
  @IsString()
  @IsNotEmpty()
  origin!: string;

  @IsString()
  @IsNotEmpty()
  destination!: string;

  @IsNotEmpty()
  departureDate!: Date;

  @IsString()
  @IsNotEmpty()
  departureTime!: string;

  @IsNumber()
  @IsNotEmpty()
  capacity!: number;
}

