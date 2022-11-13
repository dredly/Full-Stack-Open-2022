import * as dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

import mongoose from 'mongoose';
import ClicktrackModel from "../src/models/clicktrack";
import UserModel from '../src/models/user';

mongoose.connect(process.env.MONGODB_URI_DEV as string)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.error('error connecting to MongoDB:', error.message);
	});

const seedDB = async () => {
	await UserModel.deleteMany({});
	await ClicktrackModel.deleteMany({});

	const user1 = new UserModel({
		username: 'miguel123',
		name: 'Miguel',
		passwordHash: 'miguel123'
	});

	const miguel = await user1.save();

	const ct1 = new ClicktrackModel({
		title: 'Flight of the Bumblebee', 
		sections: [{
			overallData: {
				numMeasures: 6,
				mtc: 0.5
			},
			rhythms: [
				{
					bpms: [120, 120],
					timeSig: [4, 4],
					accentedBeats: [0]
				}
			],
			id: uuidv4()
		}],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		author: miguel.id
	});
	const ct2 = new ClicktrackModel({
		title: 'In the Hall of the Mountain King', 
		sections: [{
			overallData: {
				numMeasures: 32,
				mtc: 0.45
			},
			rhythms: [
				{
					bpms: [80, 180],
					timeSig: [4, 4],
					accentedBeats: [0, 2]
				}
			],
			id: uuidv4()
		}],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		author: miguel.id
	});
	const ct3 = new ClicktrackModel({
		title: 'Band Practice 24/05/2022', 
		sections: [{
			overallData: {
				numMeasures: 8,
				mtc: 0.5
			},
			rhythms: [
				{
					bpms: [120, 120],
					timeSig: [4, 4],
					accentedBeats: [0]
				}
			],
			id: uuidv4()
		},
		{
			overallData: {
				numMeasures: 12,
				mtc: 0.7
			},
			rhythms: [
				{
					bpms: [120, 90],
					timeSig: [3, 8],
					accentedBeats: [0]
				}
			],
			id: uuidv4()
		}
		],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		author: miguel.id
	});

	await ct1.save();
	await ct2.save();
	await ct3.save();

	await mongoose.connection.close();
};

seedDB().then(() => {
	console.log('Done');
}).catch(() => {
	console.error('Error');
});