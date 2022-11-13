import * as express from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user';

const userExtractor = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		if (req.token) {
			const decodedToken: JwtPayload = jwt.verify(req.token, config.SECRET) as JwtPayload;
			if (!decodedToken.id) {
				return res.status(401).json({ error: 'token missing or invalid' });
			}
			const user = await UserModel.findById(decodedToken.id);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			req.userId = decodedToken.id as string;
			return next();
		} else {
			return res.status(401).json({
				error: 'invalid token'
			});
		}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (err.name === 'JsonWebTokenError') {
			return res.status(401).json({
				error: 'invalid token'
			});
		} else if (err.name === 'TokenExpiredError') {
			return res.status(401).json({
				error: 'token expired'
			});
		}
	}
	next();
};

export default userExtractor;
