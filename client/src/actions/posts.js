import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';
import * as api from '../api' //means we are importing everything from the api folder


// Action Creators are functions that return actions and they have a type & payload

//********************************* */

// export const getPosts = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchPosts();

//         dispatch({ type: FETCH_ALL, payload: data });
//     } catch (error ) {
//         console.log(error.message); 
//     }
// };

//********************************* */
//for fetching single post(post with more details)
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data }); //our payload is now an object that contains different things(data of post, current page and number of pages)
        dispatch({ type: END_LOADING });
    } catch (error ) {
        console.log(error.message); 
    }
};


//for getting posts with pages
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error ) {
        console.log(error.message); 
    }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }

};




export const createPost = (post ) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post); // this is simply making an api request to the back end server

        dispatch({ type: CREATE, payload: data  });
        dispatch({ type: END_LOADING });
    } catch (error ) {
        console.log(error); 
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post); 

        dispatch({ type: UPDATE, payload: data  });
    } catch (error ) {
        console.log(error ); 
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); 

        dispatch({ type: DELETE, payload: id  });
    } catch (error ) {
        console.log(error); 
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id); 

        dispatch({ type: UPDATE, payload: data  });
    } catch (error ) {
        console.log(error); 
    }
};

//COMMENT POST
export const commentPost = (value, id) => async (dispatch) => {
    try {
       const { data } = await api.comment(value, id);

       dispatch({ type: COMMENT, payload: data  });
       return data.comments;
    } catch (error) {
        console.log(error);
    }
}


//From here, we move to the reducers to implement our actions

//const { data} .. we are simply taking the data from the response object 