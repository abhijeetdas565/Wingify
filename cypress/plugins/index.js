const { mochawesome } = require('mochawesome');

module.exports = (on, config) => {
  on('after:run', (results) => {
    return mochawesome.generate(results);
  });
};
