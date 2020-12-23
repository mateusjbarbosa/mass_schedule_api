import mongoose, { Document, Model } from 'mongoose';

export enum UserRole {
  FAITH = 'FAITH',
  SECRETARY = 'SECRETARY',
  ADMIN = 'ADMIN',
}

export interface User {
  _id?: string;
  telephoneNumber: string;
  fullName: string;
  dateBirth: string;
  isTithe: boolean;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  generalRecord: string;
  individualRecord: string;
  role: UserRole;
  celebration_allowed_count: number;
}

const schema = new mongoose.Schema(
  {
    telephoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    dateBirth: { type: String, required: true },
    isTithe: { type: Boolean, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    generalRecord: { type: String, required: true },
    individualRecord: { type: String, required: true },
    role: { type: String, required: true },
    celebration_allowed_count: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface UserModel extends Omit<User, '_id'>, Document {}

export const User: Model<UserModel> = mongoose.model('User', schema);
