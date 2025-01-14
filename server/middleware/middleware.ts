import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from '../config/log';

const frontendURI = process.env.frontendURI ?? 'http://localhost:3000';

// CORS configuration
const corsOptions = {
  origin: frontendURI,
  credentials: true,
};

// Request logging middleware
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`); // Log the request method and URL
  next();
};

// Error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message); // Log the error message
  res.status(500).send('Something went wrong!');
};

const middleware = [
  cors(corsOptions),
  express.json(),
  cookieParser(),
  requestLogger,
  errorHandler
];

export default middleware;
