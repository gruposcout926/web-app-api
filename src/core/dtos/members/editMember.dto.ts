import { CreateMemberDto } from './createMember.dto';

export interface EditMemberDto extends CreateMemberDto {
    id: string;
}
