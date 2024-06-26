import { GuardianType } from 'src/core/enums';

export interface MemberResponse {
    id: string;
    address: string;
    createdAt: string;
    dateOfBirth: number;
    emergencyPhone: string;
    fullName: string;
    identificationNumber: string;
    lastName: string;
    name: string;
    nationality: string;
    tutorCharacter: GuardianType;
}
