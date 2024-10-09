import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Min } from "class-validator";

export class PostCreateDto {
    @ApiProperty()
    @IsString()
    @Length(3,80)
    title: string

    @ApiProperty()
    @Min(1)
    @IsString()
    content: string

}

export class InteractWithPostDto {
    @ApiProperty()
    post_id: number
}