import { Body, Controller, Get, Post, Delete, Headers, UseGuards, Patch, Param, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { InteractWithPostDto, PostCreateDto } from './post.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ThisUserGuard } from 'src/auth/this-user.guard';
import { request } from 'http';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly jwtService: JwtService) {}

  @ApiResponse({
    status: 201,
    description: "Get all posts",
  })
  @Get('')
  async getPosts() {
    return await this.postService.getAllPosts()
  }

  @ApiOkResponse({
    status: 201, 
    description: "Store message in DB"
  })
  @ApiBody({type: PostCreateDto})
  @UseGuards(AuthGuard)
  @Post('store')
  async createPost(@Body() dto: PostCreateDto, @Headers('Authorization') token: string) {
    return await this.postService.createPost(dto, await this.jwtService.decode(token).id)
  }

  @ApiOkResponse({
    status: 201, 
    description: "Delete message from DB"
  })
  @UseGuards(AuthGuard)
  @UseGuards(ThisUserGuard)
  @Delete(':id')
  async deletePost(@Param('id') post_id: number) {
    return await this.postService.deletePost(post_id)
  } 

  @ApiOkResponse({
    status: 201, 
    description: "Edit message in DB"
  })
  @ApiBody({type: PostCreateDto})
  @UseGuards(AuthGuard)
  @UseGuards(ThisUserGuard)
  @Patch(':id')
  async editPost(@Param('id') post_id: number, @Body() dto: PostCreateDto, @Req() request: Request) {
    return await this.postService.editPost(post_id, dto, request['post'])
  }
}
