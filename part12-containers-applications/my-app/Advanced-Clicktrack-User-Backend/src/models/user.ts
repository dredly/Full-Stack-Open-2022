import { prop, buildSchema } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class User {
  @prop()
  public username!: string;

  @prop()
  public name!: string;

  @prop()
  public passwordHash!: string;
}

const UserSchema = buildSchema(User);

UserSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		//Password hash should not be revealed
		delete returnedObject.passwordHash;
	}
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
