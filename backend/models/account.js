const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    
        "accounts": [
          {
            "_id": "5e5e66ec503f045f1e813d97",
            "number": 3121,
            "type": "chequing",
            "balance": 917526.0,
            "creationDate": "4/24/2019",
            "status": "open",
          }
        ]
      
})

// Create model for todo
const Account = mongoose.model('account', AccountSchema);

module.exports = Account;


