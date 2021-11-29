// This is where all the routes are initiated from the backend to the front end
import axios from 'axios';

const API = axios.create({ baseURL: 'https://memoiproject.herokuapp.com/' })

// const url = 'http://localhost:5000/posts';

API.interceptors.request.use((req) => {  //this will send our token to the backend midddleware to verify that we are logged in
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; // this will get our token 
    }

    return req;
})


// export const fetchPosts = () => API.get('/posts'); //NORMAL GET REQUEST WITHOUT PAGES 
export const fetchPost = (id) => API.get(`/posts/${id}`); ////for fetching single post(post with more details)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); //from here, we move to the backend(controllers) to modfy the data for the specific page

//^^^^^^
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search ||'none'}&tags=${searchQuery.tags}`); // Query parameters start with a ? and then you specify a variable name. if there is no search we want to show string of none. And in this searchquery, we'll also handle our tag search
//^^^
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//For COMMENT
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


//once we have the api requests here, we move on to Actions