import { IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    teamName: string;

}

export class UpdateTeamDto {
    @IsString()
    teamName: string;
    @IsString()
    managerId: string;
}