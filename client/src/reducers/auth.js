import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data })); //save the data in local storage so on page refresh, the browser will still know we are logged in
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;

//from here, we move to the index.js of our reducers and import it there

//Afterwards, we move to Navbar because that's the best place to use this data since we already have our user which is currently set to null in that component.
