export interface UserEntity {
    id: string;
    address: string;
    dateOfBirth: number;
    identificationNumber: number;
    email: string;
    externalUserId?: string | null;
    name: string;
    nationality: string;
    lastName: string;
    phone: string;
}
