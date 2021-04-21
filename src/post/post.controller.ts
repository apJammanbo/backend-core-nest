import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostService } from "./post.service";
import CreatePostDto from "./dtos/createPost.dto";
import UpdatePostDto from "./dtos/updatePost.dto";

@Controller("post")
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(":id")
  getPostById(@Param("id") id: number) {
    console.log(id);
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(":id")
  async updatePost(@Param("id") id: number, @Body() updatePost: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePost);
  }

  @Delete(":id")
  async deletePost(@Param("id") id: number) {
    this.postsService.deletePost(id);
  }
}
