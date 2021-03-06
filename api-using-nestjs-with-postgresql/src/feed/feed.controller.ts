import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Delete
} from '@nestjs/common';
import { feedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { UpdatePostDto} from '../dto/updatePost.dto'
import { CreatePostDto } from '../dto/post.dto';
import { FeedService } from './feed.service';


@Controller('feed')
export class FeedController {
  constructor(private feedService:FeedService) {}

  @Post()
  createReport(@Body() body: CreatePostDto) {
    return this.feedService.createPost(body);
  }

  @Get()
  findAll(){
    return this.feedService.findAll()
  }

  // @Patch('/:id')
  // updateUser(@Param('id') id: number, @Body() body: CreatePostDto){
  //   return this.feedService.update(id, body);
  // }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    return this.feedService.findOne(parseInt(id));
  }


  // Applying the pagination from the controller

  // @Get()
  // findSeletced(@Query('take') take:number=1 , @Query('skip') skip:number=1){
  //   take = take>20 ? 20: take;

  //    return this.feedService.findPosts(take , skip)
     
  // }

  @Get()
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<any[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }


  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.feedService.update(parseInt(id), body);
  }


  //http://localhost:3000/api/feed/17

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.feedService.remove(parseInt(id));
  }





 
}
