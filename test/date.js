import { expect } from "chai";
import mongoose, { Schema } from "mongoose";
import date from "../src/date";

describe("Mongoose Date", () => {

  before((done) => {

    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/mongoose-test", { useMongoClient: true }).then(() => {
      const CustomPostSchema = new Schema({
        title: String,
        body: String,
      });

      CustomPostSchema.plugin(date, {
        created: "creationDate",
        modified: "modificationDate"
      });
      
      const CustomPost = mongoose.model("customPost", CustomPostSchema);      

      const PostSchema = new Schema({
        title: String,
        body: String
      });

      PostSchema.plugin(date);
      
      const Post = mongoose.model("post", PostSchema);
      Promise.all([
        Post.remove(),
        CustomPost.remove()
      ]).then(() => done());

    }).catch(done);

  });

  it("should throw when you try to apply the plugin to a Schema with the same properties already defined", () => {
  
    expect(() => {
      const TestSchema = new Schema({
        created: Date,
        modified: Date
      });
      TestSchema.plugin(date);
    }).to.throw(Error)

  });
  
  it("should throw when you try to apply the plugin with empty property names", () => {
  
    expect(() => {
      const TestSchema = new Schema({
        created: Date,
        modified: Date
      });
      TestSchema.plugin(date, {
        created: "",
        modified: ""
      });
    }).to.throw(Error)
    
    expect(() => {
      const TestSchema = new Schema({
        created: Date,
        modified: Date
      });
      TestSchema.plugin(date, {
        created: 0,
        modified: 0
      });
    }).to.throw(Error)
    
    expect(() => {
      const TestSchema = new Schema({
        created: Date,
        modified: Date
      });
      TestSchema.plugin(date, {
        created: null,
        modified: null 
      });
    }).to.throw(Error)
    
    expect(() => {
      const TestSchema = new Schema({
        created: Date,
        modified: Date
      });
      TestSchema.plugin(date, {
        created: 1,
        modified: 2 
      });
    }).to.throw(Error)

  });

  it("should save an entry with its creation and modification date", (done) => {

    const Post = mongoose.model("post");
    const newPost = new Post({
      title: "Entry",
      body: "Entry"
    });

    newPost.save().then((savedPost) => {
      expect(savedPost)
        .to.have.property('created')
        .that.is.an.instanceof(Date);

      expect(savedPost)
        .to.have.property('modified')
        .that.is.an.instanceof(Date);

      expect(savedPost.created)
        .to.be.equal(savedPost.modified);

      return done();
    }).catch(done);

  });

  it("should update modification date", (done) => {

    const Post = mongoose.model("post");
    Post.findOne({}).then((post) => {

      post.title = "Updated entry";
      post.body = "Updated entry";
      post.save().then((updatedPost) => {
        expect(updatedPost)
          .to.have.property('created')
          .that.is.an.instanceof(Date);

        expect(updatedPost)
          .to.have.property('modified')
          .that.is.an.instanceof(Date);

        expect(updatedPost.created)
          .to.be.not.equal(updatedPost.modified);

        return done();
      }).catch(done);

    });

  });

  it("should save an entry with its creation and modifcation date as `creationDate` and `modificationDate` respectively", (done) => {
    const Post = mongoose.model("customPost");
    const newPost = new Post({
      title: "Entry",
      body: "Entry"
    });

    newPost.save().then((savedPost) => {
      expect(savedPost)
        .to.have.property('creationDate')
        .that.is.an.instanceof(Date);

      expect(savedPost)
        .to.have.property('modificationDate')
        .that.is.an.instanceof(Date);

      expect(savedPost.creationDate)
        .to.be.equal(savedPost.modificationDate);

      return done();
    }).catch(done);

  });

  it("should update modification date as `modificationDate`", (done) => {

    const Post = mongoose.model("customPost");
    Post.findOne({}).then((post) => {

      post.title = "Updated entry";
      post.body = "Updated entry";
      post.save().then((updatedPost) => {
        expect(updatedPost)
          .to.have.property('creationDate')
          .that.is.an.instanceof(Date);

        expect(updatedPost)
          .to.have.property('modificationDate')
          .that.is.an.instanceof(Date);

        expect(updatedPost.creationDate)
          .to.be.not.equal(updatedPost.modificationDate);
        return done();
      }).catch(done);

    });

  });

});
