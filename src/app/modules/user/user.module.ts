export interface IUser {
  readonly id: number;
  full_name: string;
  celebration_allowed_count: number;
  date_birth: string;
  is_tithe: boolean;
  street: string;
  house_number: string;
  neighborhood: string;
  city: string;
  general_record: string;
  individual_record: string;
  role: string;
}

export interface IUserDetail extends IUser {
  full_name: string;
  celebration_allowed_count: number;
  date_birth: string;
  is_tithe: boolean;
  street: string;
  house_number: string;
  neighborhood: string;
  city: string;
  general_record: string;
  individual_record: string;
  role: string;
}

export function create(user: IUserDetail): IUserDetail {
  return user;
}
