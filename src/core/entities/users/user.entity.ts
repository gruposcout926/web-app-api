import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    address: string;

    @ApiProperty({ description: 'Unix time stamp' })
    dateOfBirth: number;

    @ApiProperty()
    identificationNumber: string;

    @ApiProperty({ type: String, format: 'email' })
    email: string;

    @ApiProperty()
    externalUserId?: string | null;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    nationality: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    phone: string;
}
