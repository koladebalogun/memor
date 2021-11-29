import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux"; //** */
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  // updating the field of the form with the values of the post we want to update ****
  // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); WITHOUT ADDING PAGES
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null); 
  // if we have a current id, we want to loop over state.posts and we want to call a find method on them we want to find the post(p) that has the same id as the current id. if we don't have the current id, return null

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));


  // use the useEffect hook to populate the values of the form
  useEffect(() => {
    if (post) setPostData(post); //if post exist, we'll setpostdata and populate it with the data of the post

    console.log(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      
    } else {
      dispatch(createPost({ ...postData, name : user?.result?.name})); // the name: will set set name of whoever created the post using the persons Id
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  //creating a card to show something if there's no user logged in
  if(!user){
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please sign in
      </Typography>
    </Paper>
  }


  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form} `}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          } // this will enable us change the value of this specific field
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} // this will enable us change the value of this specific field
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          } // this will enable us change the value of this specific field
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} // this will enable us change the value of this specific field
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
