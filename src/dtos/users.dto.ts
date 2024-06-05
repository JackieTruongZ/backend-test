import { BankInfor, UserInforAccess } from '@/interfaces/users.interface';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  public teamId: string;

  @IsEmail()
  public email: string;

  @IsString()
  public googleId: string;

  @IsString()
  public name: string;

  @IsString()
  public givenName: string;

  @IsString()
  public familyName: string;

  @IsString()
  public verified_email: string;

  @IsString()
  public avatar: string;

  @IsString()
  public locale: string;

  @IsOptional()
  @IsArray()
  public role: string[];

  @IsOptional()
  @IsString()
  public gender: string;

  @IsOptional()
  public date: Date;

  @IsOptional()
  @IsString()
  public numberPhone: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public citizenIdentityCard: string;

  @IsOptional()
  public bankInfor: BankInfor;

  @IsOptional()
  public accessable: UserInforAccess;

}

export class UpdateUserDto {

  @IsOptional()
  @IsArray()
  public role: string[];

  @IsOptional()
  @IsString()
  public teamId: string;

  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public givenName: string;

  @IsOptional()
  @IsString()
  public familyName: string;

  @IsOptional()
  @IsString()
  public avatar: string;

  @IsOptional()
  @IsString()
  public locale: string;

  @IsOptional()
  @IsString()
  public gender: string;

  @IsOptional()
  public date: Date;

  @IsOptional()
  @IsString()
  public numberPhone: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public citizenIdentityCard: string;

  @IsOptional()
  public bankInfor: BankInfor;

  @IsOptional()
  public accessable: UserInforAccess;

}

export class UpdatePositionUserDto {
  @IsOptional()
  @IsArray()
  public role: string[];

  @IsOptional()
  @IsString()
  public teamId: string;
}


export class UpdateUserbaseDto {

  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public givenName: string;

  @IsOptional()
  @IsString()
  public familyName: string;

  @IsOptional()
  @IsString()
  public avatar: string;

  @IsOptional()
  @IsString()
  public locale: string;

  @IsOptional()
  @IsString()
  public gender: string;

  @IsOptional()
  public date: Date;

  @IsOptional()
  @IsString()
  public numberPhone: string;

  @IsOptional()
  @IsString()
  public address: string;

  @IsOptional()
  @IsString()
  public citizenIdentityCard: string;

  @IsOptional()
  public bankInfor: BankInfor;

  @IsOptional()
  public accessable: UserInforAccess;

}
