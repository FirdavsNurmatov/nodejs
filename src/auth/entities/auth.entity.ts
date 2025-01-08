import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/enums/role.enum';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ min: 2 })
  first_name: string;

  @Prop({ min: 2 })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 4 })
  password: string;

  @Prop({ enum: [Role.User, Role.Admin, Role.SuperAdmin], default: Role.User })
  role: Role;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
