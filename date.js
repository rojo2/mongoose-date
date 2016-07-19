/**
 * Plugin that adds two dates to the mongoose object,
 * a creation date and a modification date.
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports = function(schema, options) {

  schema.add({
    created: Date,
    modified: Date
  });

  schema.pre("save", function(next) {
    const currentDate = new Date();
    if (this.isNew) {
      this.created = currentDate;
    }
    this.modified = currentDate;
    return next();
  });

};
