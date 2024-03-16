import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Organization } from './organization.schema';

export type UserDocument = User &
  Document & { id: string | mongoose.Schema.Types.ObjectId };

const options: SchemaOptions = {
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    index: true,
  })
  organization: Organization;

  @Prop({
    required: true,
    match: /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/,
    minlength: 4,
    maxlength: 80,
  })
  userId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ organization: 1, user_id: 1 }, { unique: true });
