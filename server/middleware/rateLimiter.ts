import rateLimit from 'express-rate-limit';

const userApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 40, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const NotesApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 1000, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export { userApiLimiter, NotesApiLimiter };
