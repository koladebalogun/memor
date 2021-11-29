import React, {useEffect} from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles'; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // allows us to dispatch redux actions

import { getPosts } from '../actions/posts'

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts); //getting the number of pages with use Selector
    
    useEffect(() => {
        if(page) dispatch(getPosts(page));
    }, [page]); //in this hook, we want to fetch the post anytime the page changes,
    
    return ( 
        <Pagination
            classes={{ ul: classes.ul}}
            count={numberOfPages} //this fetches the number of count depending on the number of pages we have.
            page={Number(page) || 1 } 
            variant="outlined"
            color="primary"
            renderItem ={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />
     );
}
 
export default Paginate;

// Our current static pagination is now done, we'll import it inside the home component