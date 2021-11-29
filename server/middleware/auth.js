import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try { // Here we  verify if the user is truly who he is claiming to be using jwt token
        const token = req.headers.authorization.split(" ")[1]; //we only want the token here, it's on the first position of the array after we split it

        const isCustomAuth = token.length < 500; //Here we have to see if the token is our own or google's token

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is google's name for a specific id that differentiates every single google user
        }

        next()

    } catch (error) {
        console.log(error)
    }
}

export default auth;
//we'll be using this auth middle ware in the routes.  so we move to the routes folde from here
