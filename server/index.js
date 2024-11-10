import express from 'express';
import cors from 'cors';
import testRouter from './routes/testRoute.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/test', testRouter);

app.listen(8080, () => {
      console.log('server listening on port 8080')
});