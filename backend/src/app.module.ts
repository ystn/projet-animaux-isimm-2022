import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';
import { DonateModule } from './donate/donate.module';

@Module({
  imports: [AuthenticationModule, UserModule, PostModule, CommentModule, MediaModule, PrismaModule, ReportModule, UserModule, DonateModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
