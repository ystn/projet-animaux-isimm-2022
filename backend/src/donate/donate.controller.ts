import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonateService } from './donate.service';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';

@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post()
  create(@Body() createDonateDto: CreateDonateDto) {
    return this.donateService.create(createDonateDto);
  }

  @Get()
  findAll() {
    return this.donateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonateDto: UpdateDonateDto) {
    return this.donateService.update(+id, updateDonateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donateService.remove(+id);
  }
}
