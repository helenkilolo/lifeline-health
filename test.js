const bcrypt = require('bcrypt');
bcrypt.hash('helenkilolo', 10, (err, hash) => {
  console.log('Hash:', hash);
});
