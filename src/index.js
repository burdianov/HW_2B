import express from 'express';
import cors from 'cors';

const app = express();

const ERROR_MISSING = 'parameter fullname missing';
const INVALID_FULLNAME = 'Invalid fullname';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/task2B', (req, res) => {
  const inputString = req.query.fullname;
  const outputString = convertString(inputString);
  res.send(outputString);
});

function convertString(fullName) {
  var result = '';
  var numberFree = /^[a-zA-Z\s]+$/;
  if (fullName == null) {
    result = ERROR_MISSING;
  } else if (fullName == '') {
    result = INVALID_FULLNAME;
  } else {
    const arr = fullName.split(' ');
    switch (arr.length) {
      case 0:
        result = ERROR_MISSING;
        break;
      case 1:
        result = arr[0];
        break;
      case 2:
        result = arr[1] + ' ' + arr[0].substr(0, 1) + '.';
        break;
      case 3:
        result = arr[2] + ' ' + arr[0].substr(0, 1) + '. ' + arr[1].substr(0, 1) + '.';
        break;
      default:
        result = 'Invalid fullname';
        break;
    }
  }

  return result;
}

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
