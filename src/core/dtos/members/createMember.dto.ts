import { GuardianType } from 'src/core/enums';

export interface CreateMemberDto {
    address: string;
    createdAt: number;
    dateOfBirth: number;
    emergencyPhone: string;
    firstName: string;
    identificationNumber: string;
    lastName: string;
    nationality: string;
    tutorCharacter: GuardianType;
    userId: string;
}
