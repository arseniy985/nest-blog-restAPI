import { IsString, Length, Min } from "class-validator";

export class PostCreateDto {
    @IsString()
    @Length(3,80)
    title: string

    @Min(6)
    @IsString()
    content: string

    user_id: number
}
export type TFlowerdUpdateDto = Partial<PostCreateDto>