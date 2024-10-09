import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateDto } from './post.dto';
import { title } from 'process';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}
    async getAllPosts() {
        return await this.prisma.post.findMany()
    }

    async createPost(dto: PostCreateDto, user_id: number) {
        const post = await this.prisma.post.create({
             data: {
                 title: dto.title,
                 content: dto.content,
                 user_id: Number(user_id)
             }
        })
        const user = await this.prisma.user.findUnique({
            where: {
                id: user_id
            }
        })
        return {
            title: post.title,
            content: post.content,
            user: {
                id: user.id,
                name: user.name
            },
            created_at: post.created_at 
        }
    }
}
