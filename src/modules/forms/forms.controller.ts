import { Controller, Post, Body } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormRequest } from 'src/core/contracts/requests';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('forms')
@Controller('api/v1/forms')
export class FormsController {
    constructor(private readonly formsService: FormsService) {}

    @Post()
    create(@Body() createFormRequest: CreateFormRequest) {
        return this.formsService.create(createFormRequest);
    }
}
