# Mongoose Date plugin
![Travis CI](https://travis-ci.org/rojo2/mongoose-date.svg?branch=master)

This small plugin adds two new properties (`modified` and `created`) to the schema.

## How to use it

```javascript
import date from "@rojo2/mongoose-date";
import password from "@rojo2/mongoose-password";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(date);
UserSchema.plugin(password);
```

If you don't like `created` and `modified` names, you can change how this plugin deals
with that properties just by setting a new name on the plugin options parameter as follows:

```javascript
import date from "@rojo2/mongoose-date";
import password from "@rojo2/mongoose-password";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(date, {
  created: "creationDate",
  modified: "modificationDate"
});
UserSchema.plugin(password);
```

What if you already had those properties on your schema? Well, no problem, if you already
had those properties in your schema this plugin will throw an `Error` notifying you that
you already had those properties defined.

Made with :heart: by ROJO 2 (http://rojo2.com)

