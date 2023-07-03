const router = require("express").Router();
const Blog = require("../models/Blog");
const mongoose = require("mongoose");

//create Blog
router.post("/", async (req, res) => {
    if(!req.body.name || !req.body.content || !req.body.author || !req.body.category) return res.status(400).json({error: "Incomplete data"});
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

//update Blog
router.put("/:id", async(req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json("Invalid ID");
    if(!req.body.name || !req.body.content || !req.body.author || !req.body.category) return res.status(400).json({error: "Incomplete data"});

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
            );
        if(!updatedBlog) {
            return res.status(404).json("No blog related to the given ID");
        }
        res.status(200).json(updatedBlog);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//delete blog
router.delete("/:id", async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json("Invalid ID");
        let blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog) return res.status(404).json("No blog related to the given ID");
        return res.status(200).json("blog has been deleted");
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

//get blog by ID
router.get("/:id", async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Invalid ID"});
        const blog = await Blog.findById(req.params.id);
        return res.status(200).json(blog);
    }
    catch(err) {
        return res.status(500).json(err);
    }
})

//get all blogs
router.get("/", async(req, res) => {
    try {
        const {category, sortBy}  = req.query;
        let query = Blog.find();
        if(sortBy) {
            if(sortBy != "name" && sortBy != "createdAt") return res.status(400).json({error: "Invalid sort field"})
            query = query.sort(sortBy);
        }   
        if(category) {
            query = query.where('category').equals(category);
        }
        const blogs = await query.exec();
        res.status(200).json(blogs);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
