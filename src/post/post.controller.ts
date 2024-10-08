import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  getPosts(req: Request, res: Response) {
    return this.postService.getAllPosts()
  }

  @Post('')
  createPost(@Body() dto: PostCreateDto) {
    return this.postService.createPost(dto)
  }
}
