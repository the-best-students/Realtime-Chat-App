import express from 'express';
const app = express();
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
