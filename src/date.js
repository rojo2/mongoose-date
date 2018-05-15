/**
 * Helper function to know if it is an string or not.
 *
 * @param {*} value - Value to check
 * @returns {boolean} - Returns if the value is a string or not
 */
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

/**
 * Helper function to know if it is 
 *
 * @param {*} value - Value to check 
 * @returns {boolean} - Returns if the value is a string and it is empty or not.
 */
function isAnEmptyString(value) {
  return isString(value) && !value.trim();
}

/**
 * Plugin that adds two dates to the mongoose object,
 * a creation date and a modification date.
 *
 * @param {mongoose.Schema} schema - Mongoose Schema to modify with two new properties.
 * @param {Object} [options] - Options to apply
 */
export default function(schema, options = {}) {

  const defaultOptions = {
    created: "created",
    modified: "modified"
  };

  const opts = { 
    ...defaultOptions, 
    ...options 
  };

  if (!opts.created || !isString(opts.created) || isAnEmptyString(opts.created)) {
    throw new Error("Invalid property name for the creation date property");
  }

  if (!opts.modified || !isString(opts.modified) || isAnEmptyString(opts.modified)) {
    throw new Error("Invalid property name for the modification date property");
  }

  if (schema.path(opts.created)) {
    throw new Error(`Property "${opts.created}" already exists`);
  }
  
  if (schema.path(opts.modified)) {
    throw new Error(`Property "${opts.created}" already exists`);
  }

  schema.add({
    [opts.created]: Date,
    [opts.modified]: Date
  });

  schema.pre("save", function (next) {
    const currentDate = new Date();
    if (this.isNew) {
      this[opts.created] = currentDate;
    }
    this[opts.modified] = currentDate;
    return next();
  });

};
