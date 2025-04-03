import { User } from '../entities/user.entity';

export type FindAllResponse = { data: User[]; total: number };
