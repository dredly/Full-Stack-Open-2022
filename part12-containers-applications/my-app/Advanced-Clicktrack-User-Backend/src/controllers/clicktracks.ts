import ClicktrackModel from "../models/clicktrack";
import { Section } from '../types';

const getAllFromUser = async (userId: string) => {
	const allClicktracks = await ClicktrackModel.find({author: userId});
	return allClicktracks;
};

const getOne = async (id: string) => {
	const foundClicktrack = await ClicktrackModel.findById(id);
	if (!foundClicktrack) {
		throw new Error('Clicktrack not found');
	} else {
		return foundClicktrack;
	}
};

const add = async (title: string, sections: Section[], authorId: string) => {
	console.log(title, sections);
	const newClicktrack = new ClicktrackModel({
		title, sections, author: authorId
	});
	console.log('newClickTrack', newClicktrack);
	const savedClictrack = await newClicktrack.save();
	return savedClictrack;
};

const edit = async (title: string, sections: Section[], id: string) => {
	try {
		const updatedClicktrack = await ClicktrackModel.findByIdAndUpdate(id, {
			title, sections
		}, { new: true });
		return updatedClicktrack;
	} catch (err) {
		return null;
	}
	
};

const destroy = async (id: string) => {
	await ClicktrackModel.findByIdAndDelete(id);
};

export default {
	getAllFromUser,
	getOne,
	add,
	edit,
	destroy
};