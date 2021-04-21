import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CreatePostDto from "./dtos/createPost.dto";
import UpdatePostDto from "./dtos/updatePost.dto";
import Post from "./entites/post.entity";

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];

  // getAllPosts
  getAllPosts() {
    return this.posts;
  }

  // get post by Id
  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  // create post
  createPost(createPostDto: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  // update post
  updatePost(id: number, updatePostDto: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = { ...updatePostDto };
      return postIndex;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  // delete post
  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
  }
}
