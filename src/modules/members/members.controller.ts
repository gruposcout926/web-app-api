import { Controller, Get, Post, Body, Param, Request, UseGuards, UseFilters } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/modules/members/members.service';
import { CreateMemberRequest } from 'src/core/contracts/requests/members';
import { FirebaseAuthGuard } from 'src/core/guards';
import { CustomErrorFilter } from 'src/core/filters';

@UseGuards(FirebaseAuthGuard)
@UseFilters(CustomErrorFilter)
@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Post()
    async create(@Body() createMemberDto: CreateMemberRequest, @Request() req: ExpressRequest) {
        console.log('🚀 ~ MembersController ~ create ~ req:', req.user);
        console.log('🚀 ~ MembersController ~ create ~ createMemberDto:', createMemberDto);

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
