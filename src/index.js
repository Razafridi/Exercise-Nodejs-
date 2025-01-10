const dotenv = require('dotenv');
const { IsDevelopment } = require('./utils/utils.js');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes.js');
const cors = require('cors');

dotenv.config(); //Set up the env
if (IsDevelopment()) {
  console.log(process.env.PORT);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

console.log(process.env.CONN_STR);
mongoose
  .connect(process.env.CONN_STR)
  .then((res) => {
    console.log('Connected Successfully');
  })
  .catch((err) => {
    console.log('Error', err);
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening At port ${PORT}`);
});
