import { prop, buildSchema, Ref } from '@typegoose/typegoose';
import { User } from './user';
import { Section } from '../types';
import mongoose from 'mongoose';

class Clicktrack {
  @prop()
  public title!: string;

  @prop()
  public sections!: Section[];

  @prop({ref: () => User})
  public author!: Ref<User>;
}

const ClicktrackSchema = buildSchema(Clicktrack);

ClicktrackSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const ClicktrackModel = mongoose.model('Clicktrack', ClicktrackSchema);

export default ClicktrackModel;