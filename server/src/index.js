//"type": "module", //add this in package.json to use import instead of require
import express from 'express';
const app = express();

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});