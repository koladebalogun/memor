import express from "express";

import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';


const router = express.Router();

router.get("/search", getPostsBySearch);

router.get("/", getPosts); 

router.post("/", auth, createPost);

router.get("/:id", getPost);

// updating the routes using Patch (this will allow us edit the post). For the updating we need to know the id of the existing post
router.patch("/:id", auth, updatePost);

router.patch("/:id/likePost", auth, likePost);

router.post("/:id/commentPost", auth, commentPost);

router.delete("/:id", auth, deletePost);


export default router;
