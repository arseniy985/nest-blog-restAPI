import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostCreateDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}
    getAllPosts() {
        return this.prisma.post.findMany()
    }

    async createPost(dto: PostCreateDto) {
        return await this.prisma.post.create({
            data: dto
        })
    }
}
