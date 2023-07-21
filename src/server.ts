import express from 'express';
import morgan from 'morgan';
import router from './router';
import authController from './controllers/auth-controller';
import cors from 'cors';
import { protect } from './modules/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', protect, router);
app.use(authController);

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(err.cause || 500);
  res.json({ message: err.message });
});

export default app;
