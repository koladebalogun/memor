import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ label, name, handleChange, handleShowPassword, autoFocus, type, half }) => { // This props would enable us have dynamic values
    return ( 
        <Grid item xs={12} sm={half ? 6 : 12 }> {/* e.g if we want some inputs to take half the width, we'll have a special prop ( half ) so if half is true we want it to take half the width which is 6 else it should remain the initial width set which is 12 */}

        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={ name === 'password' ? {  
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            { type === 'password' ? <Visibility/> : <VisibilityOff/> }
                            </IconButton>
                    </InputAdornment>
                ),
            } : null } //For show password icon
        />

        </Grid>
     );
}
 
export default Input;

//we are creating a Grid that all of our items would have, this would save the trouble of writing it multiple times

// when we have some components that look a behave the same, we create a new custom component that will generalize the logic by. This will be a component that will hold similar details and we'll just specify the things that change.


// In javascript, when there's a ternary operator with the second value being null, use && and you won't have to provide the null.