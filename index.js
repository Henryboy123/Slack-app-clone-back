const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');

dotenv.config();

const router = require('./app/routes/routes');
require('./db');

const app = express();
const server = http.createServer(app);
app.use(cors());

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running properly', status: 200 });
});

const setupSocket = require('./socket');
const io = setupSocket(server);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
