import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// //if action creators are asyn, we use redux-thunk meaning we have a function that returns an async function with a disptach

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //login user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // user signup
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error); 
    }
}