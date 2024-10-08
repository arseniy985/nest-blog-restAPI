import { Body, Controller, Get, Post, Query, Headers, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './post.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly jwtService: JwtService) {}

  @Get('')
  getPosts() {
    return this.postService.getAllPosts()
  }

  @UseGuards(AuthGuard)
  @Post('store')
  createPost(@Body() dto: PostCreateDto, @Headers('Authorization') token: string) {
    return this.postService.createPost(dto, this.jwtService.decode(token).id)
  }

}
