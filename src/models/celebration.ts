import mongoose, { Document, Model } from 'mongoose';

export enum CelebrationType {
  MASS = 'MASS',
  NOVENA = 'NOVENA',
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

export interface Celebration {
  _id?: string;
  date: string;
  type: CelebrationType;
  faithful_allowed_count: number;
}

interface CelebrationModel extends Omit<Celebration, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String },
    faithful_allowed_count: { type: Number, required: true },
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

schema.path('date').validate(
  async (date: string) => {
    const dateCount = await mongoose.models.Celebration.countDocuments({
      date,
    });

    return !dateCount;
  },
  'already exists in the database',
  CUSTOM_VALIDATION.DUPLICATED
);

export const Celebration: Model<CelebrationModel> = mongoose.model(
  'Celebration',
  schema
);
