/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import userController from '../controllers/users';

const router = express.Router();

// router.get('/:id', (async (req, res) => {
// 	const user = await userController.getOne(req.params.id.toString());
// 	console.log(typeof user);
// 	res.send(user);
// }));

// router.get('/', (async (_req, res) => {
// 	const allUsers = await userController.getAll();
// 	res.send(allUsers);
// }));

router.post('/login', (async (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { username, password } = req.body;
	const user = await userController.getByUsername(username as string);
	if (!user) {
		return res.status(401).send({error: 'Bad credentials'});
	}
	const isPasswordCorrect = await userController.checkPassword(password as string, user.passwordHash);
	if (!isPasswordCorrect) {
		return res.status(401).send({error: 'Bad credentials'});
	}
	const token = userController.giveToken(user.username, user.id as string);
	return res.send({token, user});
}));

router.post('/', (async (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { username, name, password } = req.body;
	if (password.length < 8) {
		return res.status(400).send({error: 'Password must be 8 characters or more'});
	}
	const existingUser = await userController.getByUsername(username as string);
	if (existingUser) {
		return res.status(400).send({error: 'A user with that name exists already'});
	}
	const savedUser = await userController.register(username as string, name as string, password as string);
	return res.status(201).send(savedUser);
}));

export default router;