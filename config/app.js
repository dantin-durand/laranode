import dotenv from "dotenv";
dotenv.config();

const APP = {
  PORT: process.env.PORT || 3000,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
  },
};

export default APP;
