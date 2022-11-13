import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import UserModel from "../models/user";
import config from '../config';

const getAll = async () => {
	const allUsers = await UserModel.find({});
	return allUsers;
};

const getOne = async (id: string) => {
	const foundUser = await UserModel.findById(id);
	if (!foundUser) {
		throw new Error('User not found');
	} else {
		return foundUser;
	}
};

const getByUsername = async (username: string) => {
	const foundUser = await UserModel.findOne({username});
	if (!foundUser) {
		return null;
	} else {
		return foundUser;
	}
};

const register = async (username: string, name: string, password: string) => {
	const saltRounds = 10;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const newUser = new UserModel({
		username,
		name,
		passwordHash
	});

	const savedUser = await newUser.save();
	return savedUser;
};

const checkPassword = async (password: string, passwordHash: string) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const isCorrect = await bcrypt.compare(password , passwordHash ) ;
	return isCorrect;
};

const giveToken = (username: string, id: string) => {
	const userForToken = {username, id};
	// Token expires in 60 * 60 * 24 seconds, so 1 day
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
	const token: string = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 * 24 });
	return token;
};

export default {
	getAll,
	getOne,
	getByUsername,
	register,
	checkPassword,
	giveToken,
};