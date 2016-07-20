# Mongoose Date plugin (https://travis-ci.org/rojo2/mongoose-date.svg?branch=master)

```javascript
const date = require("rojo2-mongoose-date");
const password = require("rojo2-mongoose-password");
const {Schema} = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(date);
UserSchema.plugin(password);

```

Made with ❤ by ROJO 2 (http://rojo2.com)

