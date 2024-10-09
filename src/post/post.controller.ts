import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './post.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly jwtService: JwtService) {}

  @ApiResponse({
    status: 201,
    description: "Get all posts",
  })
  @Get('')
  getPosts() {
    return this.postService.getAllPosts()
  }

  @ApiResponse({
    status: 201, 
    description: "Store message in DB"
  })
  @ApiBody({type: PostCreateDto})
  @UseGuards(AuthGuard)
  @Post('store')
  createPost(@Body() dto: PostCreateDto, @Headers('Authorization') token: string) {
    return this.postService.createPost(dto, this.jwtService.decode(token).id)
  }

}
