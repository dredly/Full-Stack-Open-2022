import * as express from 'express';

const tokenExtractor = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7);
	}
	next();
};

export default tokenExtractor;
