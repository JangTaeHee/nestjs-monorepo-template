import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

const options: SchemaOptions = {
  collection: 'organizations',
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
export class Organization extends Document {
  @Prop({ required: true, unique: true, index: true })
  organizationId: string;

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

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
