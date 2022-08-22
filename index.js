const fs = require('fs');
const { resolve } = require('node:path/win32');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write the file');
      resolve('sucess');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res1pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1pro, res2pro, res3pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(all);

    console.log(res.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log(err.message);
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic().then((x) => {
//   console.log(x);
//
// });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
