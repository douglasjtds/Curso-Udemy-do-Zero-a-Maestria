const x = '10';

// check if x is a number
if (!Number.isInteger(x)) {
  throw new Error('X value is not an integer number');
}

console.log('continuing code...');
