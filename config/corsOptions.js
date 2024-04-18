import allowedOrigins from './allowedOrigins.js'

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {  // allow requests with no origin 
            // (like mobile apps or curl requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;
