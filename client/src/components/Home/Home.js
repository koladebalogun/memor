import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux'; // allows us to dispatch redux actions
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import { getPostsBySearch } from '../../actions/posts'; //^^^^^
import Pagination from '../Pagination' //^^
import useStyles from '../../styles';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function useQuery() { //setting up our url search param.this will help identify the page we currently and the search terms we are looking for
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null); //**  it's null at the start because we don't have the id selected */
  const classes = useStyles();
  const dispatch = useDispatch();

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const query = useQuery(); // this will let us use it as a hook.
  const navigate  = useNavigate();
  const page = query.get('page') || 1; // getting our page info. This will read the url and see if we have a page parameter in there if so, it will populate this variable and if we don't have the page we'll be on the first one .//THE PAGE WOULD BE PASSED AS A PROP INTO THE PAGINATION COMPONENT

  const searchQuery = query.get('searchQuery')
  const [ search, setSearch ] = useState(''); // setting a state for our search fields
  const [ tags, setTags ] = useState([]); // state for tag search
  //^^^^^^^^^^


  //********************************* */

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]); //adding currentId as a dependency would mean we don't have to refresh everytime we make changes

  //********************************* */


  //^^^^^^^^^^^^^^^^^
  const searchPost = () => {

    if(search.trim() || tags) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(',')})); //This action is taking the search query object that we specified, and we also provide tags which we have to render into a string that way it will be easier to pass data from the front to backend. because we cannot pass an array through the url parameters
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13 ) {
      searchPost();
      //This would enable us use the enter key submit a search
    }
  }

  const handleAdd = (tag) => {
    setTags([ ...tags, tag]); 
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  //^^^^^^^
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />{" "}
            {/* passing the setter method (Methods which update a variable) which is the (setCurrentId) as props into the Posts component */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)} // This will enable us change the value of the search
              />
              <ChipInput
                style={{ margin: '10px 0'}}
                value={tags} //This value has to be dynamic, it has to be from state
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              /> {/*^^ For searching by tags */}
              <Button onClick={searchPost} className={classes.searchButton} variant='contained' color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />{" "}
            {/* passing the current Id as a prop into the form component. a setter method will be passed here as well  */}

            {/* ^^^^ we are calling our pagination component below the form and if there's no search or tags, we don't want to show the pagination */}
            {( !searchQuery && !tags.length) && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page}/> 
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
