import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ForumModule } from './forum/forum.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthenticationModule, ForumModule, GroupModule, PostModule, CommentModule, MediaModule, PrismaModule, ReportModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
