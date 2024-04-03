import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberRequest } from 'src/core/contracts/requests/members';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Post()
    async create(@Body() createMemberDto: CreateMemberRequest) {
        return await this.membersService.create(createMemberDto);
    }

    @Get()
    async findAll() {
        return this.membersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.membersService.findOne(id);
    }
}
