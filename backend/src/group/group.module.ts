import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule { }
