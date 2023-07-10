const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const me = require('./routes/me');
const upload = require('./routes/file');
const handleErrors = require('./middlewares/error');
const verifyToken = require('./middlewares/token');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/login', login);
app.use('/api/register', register);
app.use(verifyToken);
app.use(handleErrors);
app.use('/api/me', me);
app.use('/api/upload', upload);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
