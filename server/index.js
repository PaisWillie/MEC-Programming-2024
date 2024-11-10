import express from 'express';
import cors from 'cors';
import testRouter from './routes/testRoute.js';
import firebaseRouter from './routes/firebaseRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/test', testRouter);
app.use('/firebase', firebaseRouter);

app.listen(8080, () => {
      console.log('server listening on port 8080')
});