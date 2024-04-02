import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { FormsService } from 'src/modules/forms/forms.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFormRequest } from 'src/core/contracts/requests';
import { CustomErrorFilter } from 'src/core/filters';

@ApiTags('forms')
@Controller('api/v1/forms')
@UseFilters(CustomErrorFilter)
export class FormsController {
    constructor(private readonly formsService: FormsService) {}

    @Post()
    async create(@Body() createFormRequest: CreateFormRequest): Promise<string> {
        return await this.formsService.create(createFormRequest);
    }
}
