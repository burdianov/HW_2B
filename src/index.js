import express from 'express';
import cors from 'cors';

const app = express();

const ERROR_MISSING = 'parameter fullname missing';
const INVALID_FULLNAME = 'Invalid fullname';
const REG_NUMBERS = /[0-9|_|\/]+/i;
const REG_MAIN = /(^[^!@# ]+\s+)?([^!@# ]+\s+)?([^!@# ]+)?/i;
const REG_NAME = /Donald/i;

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
  var result = INVALID_FULLNAME;
  var arr = fullName.split(' ').filter(value => {
    if (value) {
      return value;
    }
  });

  if (arr.length <= 3 && !REG_NUMBERS.test(fullName)) {
    var portion = arr.join(' ').match(REG_MAIN);

    var portionOne = portion[1] || '';
    var portionTwo = portion[2] || '';
    var portionThree = portion[3] || '';

    if (portionOne && portionTwo && portionThree) {
      result = `${portionThree[0].toUpperCase() + portionThree.slice(1, portionThree.length).toLowerCase()} ${portionOne[0].toUpperCase()}. ${portionTwo[0].toUpperCase()}.`;
    } else if (portionOne && portionThree) {
      result = `${portionThree} ${portionOne[0].toUpperCase()}.`;
      if (REG_NAME.test(portionThree)) {
        result = 'Invalid fullname';
      }
    } else if (portionThree) {
      result = `${portionThree}`;
    }
  }

  return result;
}

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
