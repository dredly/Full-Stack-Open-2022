import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

let PORT: string;
let MONGODB_URI: string;
let SECRET: string;

if (!process.env.PORT) {
	throw new Error('PORT value missing');
} else {
	PORT = process.env.PORT;
}

if (process.env.NODE_ENV !== 'production') {
	if (!process.env.MONGODB_URI_DEV) {
		throw new Error('MONGODB_URI_DEV value missing');
	} else {
		MONGODB_URI = process.env.MONGODB_URI_DEV;
	}
} else {
	if (!process.env.MONGODB_URI_PROD) {
		throw new Error('MONGODB_URI_PROD value missing');
	} else {
		MONGODB_URI = process.env.MONGODB_URI_PROD;
	}

}

if (!process.env.SECRET) {
	throw new Error('SECRET value missing');
} else {
	SECRET = process.env.SECRET;
}

export default {
	PORT,
	MONGODB_URI,
	SECRET,
};