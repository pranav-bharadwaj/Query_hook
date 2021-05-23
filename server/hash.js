const bcrypt = require('bcrypt')
password = "parana"
let hashing = bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in your password DB.
    if(err) throw err
   console.log(hash)
});
console.log(hashing)
