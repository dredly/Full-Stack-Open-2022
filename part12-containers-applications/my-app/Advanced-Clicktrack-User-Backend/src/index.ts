import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import clicktrackRouter from './routes/clicktracks';
import userRouter from './routes/users';
import config from './config';
import tokenExtractor from './middleware/tokenExtractor';

//Extend the default Request interface to add custom properties
declare module 'express-serve-static-core' {
  interface Request {
    token?: string;
	userId?: string;
  }
}

const app = express();

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use('/api/clicktracks', clicktrackRouter);
app.use('/api/users', userRouter);

app.get('/api/ping', (_req, res) => {
	res.send('pongalong');
});

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});