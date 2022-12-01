import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, UserService, PostService],
  exports: [ReportService]
})
export class ReportModule { }
