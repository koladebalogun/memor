import React from "react";
import { Grid, CircularProgress } from "@material-ui/core"; // ***
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import useStyles from "./styles";

const Posts = ({setCurrentId}) => {
  //const posts = useSelector((state) => state.posts) 
  const {posts, isLoading} = useSelector((state) => state.posts) // ^^^^^^^^ We are destructing the post because we have an object with aproperty of post  ^^^^^^^^^^^
  const classes = useStyles();

  console.log(posts)

  if(!posts.length && !isLoading) return 'No Posts'
  
  return (
    isLoading ? <CircularProgress/> : (  //if there's no post.length, show circular progress (loading) else show content
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} /> {/* we'll pass the (setCurrentId) one level deeper into the post component. this is called props drilling */}
          </Grid>
        ))
          
        }
      </Grid>
    )
  );
};

export default Posts;
