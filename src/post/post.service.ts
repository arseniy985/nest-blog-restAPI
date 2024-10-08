import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}
    getAllPosts() {
        return this.prisma.post.findMany()
    }

    async createPost(dto: PostCreateDto, user_id: number) {
         return await this.prisma.post.create({
             data: {
                 title: dto.title,
                 content: dto.content,
                 user_id: Number(user_id)
             }
         })
    }
}
