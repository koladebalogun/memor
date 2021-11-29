import React, {useRef, useState} from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ comments, setComments ] = useState(post?.comments);
    const [ comment, setComment ] = useState(''); //this state will keep track of the value of a specific comment
    const user  = JSON.parse(localStorage.getItem('profile')); //grabbing our user from loacl storage to get the details of the person adding a comment
    const commentsRef = useRef(); 

    const handleClick = async() => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    return ( 
        <div>
            <div className={classes.commentsOuterContainer }>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {/* If there's a user, display this code which will allow the user to add and view comments*/}
                {user?.result?.name && (
                    <div style={{ width: '70%'}}>
                    <Typography gutterBottom variant="h6" >Leave a comment</Typography>
                    <TextField 
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value) }
                    />
                    <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>Comment</Button>
                    </div> 
                )}
            </div>
        </div>
     );
}
 
export default CommentSection;

//we'll pass the comment section inside the post details component.