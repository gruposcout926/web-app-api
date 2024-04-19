import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities';

export class GetUserResponse extends UserEntity {
    @ApiProperty()
    roles: string[];
}
