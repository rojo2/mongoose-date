const {expect} = require("chai");
const mongoose = require("mongoose");
const date = require("../date");

describe("Mongoose Date", () => {

  before((done) => {

    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/mongoose-test", (err) => {

      if (err) {
        return done(err);
      }

      const PostSchema = new mongoose.Schema({
        title: String,
        body: String
      });

      PostSchema.plugin(date);
      
      const Post = mongoose.model("post", PostSchema);
      Post.remove().then(() => done());

    });

  });

  it("should save an entry with its creation and modification date", (done) => {

    const Post = mongoose.model("post");
    const newPost = new Post({
      title: "Entry",
      body: "Entry"
    });

    newPost.save().then((savedPost) => {
      expect(savedPost.created).to.be.equal(savedPost.modified);
      done();
    }).catch((err) => done(err));

  });

  it("should update modification date", (done) => {

    const Post = mongoose.model("post");

    Post.findOne({}).then((post) => {

      post.title = "Updated entry";
      post.body = "Updated entry";
      post.save().then((updatedPost) => {
        expect(updatedPost.created).to.be.not.equal(updatedPost.modified);
        done();
      }).catch((err) => done(err));

    });

  });

});
