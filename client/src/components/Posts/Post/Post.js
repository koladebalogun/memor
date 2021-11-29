// ****
import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ likes, setLikes ] = useState(post?.likes);
  
  const user = JSON.parse(localStorage.getItem('profile'));

  const hasLikedPost = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id));

  const handleLike = async() => {
    dispatch(likePost(post._id));

    if(hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== (user?.result?.googleId || user?.result?._id)))
    }else{
      setLikes([ ...post.likes, (user?.result?.googleId || user?.result?._id )]) 
    }
  }


  //creating a subcomponent that will handle our like and likes 
  //* we'll pass the like subcomponent into the like button code block 
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) //Here we are checking if a current user liked a post or not
        ? ( //Here we are checking if the likes array contains the id of the current user (either the google-id or the custom-id from the data base)
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</> //we'll have a message saying 'You and a certain number of people liked something or the has 1 or multiple likes
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</> //And if the person didn't like it, we'll just say number of like or likes
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>; //And if the user is the first to like it, it will just show like
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`); //opening the post details of the post that is currently selected with the id, by navigating to that id
  };

  


  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}> {/* This Buttonbase would allow us view more details about any card we click */}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography> {/******* */}
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {/*We are checking if the post was created by the current user, only then do we want to show the edit button */}
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}> 
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            {" "}
            {/* For editing the post */}
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>{" "}
        {/* adding hashtags to our tags */}
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title }
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>

        {/* we'll pass the like subcomponent into the like button */}
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes/> {/* we'll pass the like subcomponent into the button */}
        </Button>

        {/*We are checking if the post was created by the current user, only then do we want to show the delete button */}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
