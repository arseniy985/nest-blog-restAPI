import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostCreateDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}
    async getAllPosts() {
        return await this.prisma.post.findMany()
    }

    async createPost(dto: PostCreateDto, user_id: number) {
        user_id = Number(user_id)
        console.log(dto)
        console.log(user_id)
        const post = await this.prisma.post.create({
             data: {
                 title: dto.title,
                 content: dto.content,
                 user_id: user_id
             }
        })
        const user = await this.prisma.user.findUnique({
            where: {
                id: user_id
            }
        })
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            user: {
                id: user.id,
                name: user.name
            },
            created_at: post.created_at 
        }
    }

    async deletePost(post_id: number) {
        this.prisma.post.delete({
            where: {
                id: post_id
            }
        })
        
        return null
    }
    async editPost(post_id: number, newData: PostCreateDto, oldPost) {
        post_id = Number(post_id)
        
        if(oldPost.title == newData.title && oldPost.content == newData.content) throw new HttpException('New post data must be different', HttpStatus.BAD_REQUEST)

        return await this.prisma.post.update({
            where: { id: post_id },
            data: {
                title: newData.title,
                content: newData.content
            }
        })
    }
}
