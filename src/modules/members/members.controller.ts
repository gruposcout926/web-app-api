import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    UseGuards,
    UseFilters,
    Put
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/modules/members/members.service';
import { CreateMemberRequest, MemberResponse } from 'src/core/contracts';
import { FirebaseAuthGuard } from 'src/core/guards';
import { CustomErrorFilter } from 'src/core/filters';
import { CreateMemberDto, EditMemberDto } from 'src/core/dtos';
import moment from 'moment';

@UseGuards(FirebaseAuthGuard)
@UseFilters(CustomErrorFilter)
@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Post()
    async create(
        @Body() createMemberRequest: CreateMemberRequest,
        @Request() req: ExpressRequest
    ): Promise<string> {
        const createMemberDto: CreateMemberDto = {
            ...createMemberRequest,
            userId: req.user.applicationUser.id,
            createdAt: moment().valueOf()
        };

        return await this.membersService.create(createMemberDto);
    }

    @Put(':id')
    async update(
        @Param('id') memberId: string,
        @Body() createMemberRequest: CreateMemberRequest,
        @Request() req: ExpressRequest
    ): Promise<void> {
        const editMemberDto: EditMemberDto = {
            id: memberId,
            ...createMemberRequest,
            userId: req.user.applicationUser.id,
            createdAt: moment().valueOf()
        };

        await this.membersService.update(editMemberDto);
    }

    @Get()
    async findAll(@Request() req: ExpressRequest): Promise<MemberResponse[]> {
        return this.membersService.findAll(req.user.applicationUser.id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
        return await this.membersService.findOne(id, req.user.applicationUser.id);
    }

    private sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}
