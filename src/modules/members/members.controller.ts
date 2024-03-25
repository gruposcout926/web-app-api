import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberRequest } from 'src/core/contracts/requests/members';

@Controller('api/v1/members')
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

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMemberDto: any) {
        return this.membersService.update(+id, updateMemberDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.membersService.remove(+id);
    }
}
