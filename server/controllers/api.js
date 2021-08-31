const Post = require("../models/posts");
const fs = require("fs");


module.exports = class API {
  //fetch all posts
  static async fetchAllPOst(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).jsson({ message: err.message });
    }
  }
  //fetch post by ID
  static async fetchPOstByID(req, res) {
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        res.status(200).json(post);
    }catch (err){
        res.status(404).json({message : err.message});
    }
  }
  //Create a Post
  static async creatPOst(req, res) {
    const post = req.body;
    const imagename = req.file.filename;
    post.image = imagename;
    try {
        await Post.create(post);
        res.status(201).json({ message: 'Post created succefully!'});
    }catch(err) {
        res.status(404).json({ message: err.message})
    }
  }
  //update post
  static async UpdatePOst(req, res) {
    const id = req.params.id;
    let new_image = "";
    if(req.file){
        new_image = req.file.filename;
        try{
            fs.unlikync("./uploads/"+req.body.old_image);
        }catch(err){
            console.log(err);
        }
    }else {
        new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image; 

    try{
        await Post.findByIdAndUpdate(id, newPost);
        res.status(200).json({ message: 'Post updated successfully'});
    }catch(err){
        res.status(404).json({message: err.message});
    }
  }
  //delete post
  static async deletePOst(req, res) {
    const id = req.params.id;
    try {
        const result = await Post.findByIdAndDelete(id);
        if(result.image != ''){
            try {
                fs.unlinkSync("./uploads/"+result.image);
            } catch(err){
                console.log(err);
            }
        }
        res.status(200).json({message: 'Post deleted successfully'});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
  }
};
