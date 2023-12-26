const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// importing routes
const routes = require('./scr/routes/crmRoute');

const app = express();
const port = 3010;

// connection mongoose
mongoose.connect('mongodb://127.0.0.1:27017/CRMdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// body parser helps us convert data as it is supposed to be passed to the database
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Listening on port 3000');
});

// setting the routes
routes(app);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Listening on port: 127.0.0.1:${port}`);
  }
});
