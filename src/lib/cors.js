// lib/cors.js
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'http://localhost:3000', // Allow this origin, or '*' for all
});

// Helper function to run middleware
export const runCors = (req, res, next) => {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return next(result);
    }
    next();
  });
};
