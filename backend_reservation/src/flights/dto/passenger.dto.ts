import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PassengerDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  uidFlight!: string;

  @IsNumber()
  seatNumber!:number;
}

