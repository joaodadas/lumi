import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
