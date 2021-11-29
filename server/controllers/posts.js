import PostMessage from "../models/postMessage.js"
import mongoose from "mongoose";



// export const getPosts = async (req, res) => { //FOR NORMAL getpost
//     try {
//         const postMessages = await PostMessage.find();
        
//         res.status(200).json(postMessages);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }


export const getPosts = async (req, res) => { //FOR IMPLEMENTING PAGINATION
    const { page } = req.query;

    try {
        const LIMIT = 6; //Number of post per page
        const startIndex = (Number(page) - 1) * LIMIT;  //start index of a post on a specific page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex); // getting post from newest to oldest
        
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//For geting single post
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
};


export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); //i stands for ignore case letters, we converted it to a regex because it's easier for mongodb to search the data base

        const posts = await PostMessage.find( { $or: [ { title }, { tags: { $in: tags.split(',') }  }] }); //$or stand for find me the title or find the tags. //$in checks to see if there's a tag in the arry of tags that matches the query

        res.json({ data: posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() }); //This will enable our backend to automatically specify the creator of a post
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params; 
    
    const post = req.body;

    //  checking to see if the id ( _id ) is a mongoose object id / valid id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}



export const deletePost = async (req, res) => {
    const { id } = req.params;

    //  checking to see if the id ( _id ) is a mongoose object id / valid id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndRemove(id);

    res.json({message: "Post Deleted Successfully"});
}



export const likePost = async (req, res) => {
    const { id } = req.params; 

    if(!req.userId) {
        return res.json({ message: "Unauthenticated"})  //checking to see if a user is authenticated
    } 


    //  checking to see if the id ( _id ) is a mongoose object id / valid id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id); //first we find the post we are looking for

    const index = post.likes.findIndex((id) => id === String(req.userId));  //checking to see if the user has already liked the post. The (id) would let us know who like a post

    if(index === -1) { 
        //like a post
        post.likes.push(req.userId);
    }else{ 
        //dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , {new: true}); 

    
    res.json(updatedPost);
}

//Controllers for adding comments
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id); //we are getting the post from the database

    post.comments.push(value); //we are adding the comments to that post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true}); //And then we are updating the data base so the new post contains the comment

    res.json(updatedPost);
}