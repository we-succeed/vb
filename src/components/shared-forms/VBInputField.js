import * as React from 'react';
import TextField from "@mui/material/TextField";
import {FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import {useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

const VBInputField = (props) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setIsShowPassword(!(isShowPassword));
    };
    return (
        <>
            {(()=>{
                switch (props.form.type) {
                    case 'password':
                        return (
                            <FormControl sx={{mt: 1, mb: 1}}
                                         variant="outlined" fullWidth error={(props.errors)}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    autoComplete="off"
                                    required
                                    id={props.form.id}
                                    label={props.form.label}
                                    name={props.form.name}
                                    type={isShowPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {isShowPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={props.data[props.form.name]}
                                    onChange={props.cb.inputChange}
                                    onBlur={props.cb.inputBlur}
                                />
                                {(props.errors) ? (
                                        <FormHelperText id="component-error-text">{props.errors.message}</FormHelperText>
                                    )
                                    : ""
                                }
                            </FormControl>
                        )
                    case 'toggle':
                        return (
                            <>
                                <FormControlLabel
                                    control={
                                        <Switch name="Status"
                                                checked={props.status}
                                                onClick={props.cb.handleStatusToggle}
                                        />
                                    }
                                    labelPlacement="start"
                                    label="Status"
                                    sx={{marginLeft: '0'}}/>
                            </>
                        )
                    default:
                        return (
                            <TextField
                                sx={{mt: 1, mb: 1}}
                                required={(props.form.required)}
                                fullWidth
                                type={(props.form.type === 'default')? 'text': 'number'}
                                id={props.form.id}
                                label={props.form.label}
                                name={props.form.name}
                                onChange={props.cb.inputChange}
                                value={props.data[props.form.name]}
                                autoComplete="off"
                                disabled={(props.form.disabled)}
                                error={(props.errors)}
                                multiline={(props.form.type === 'multiline')}
                                helperText={(props.errors) ? props.errors.message : ''}
                            />
                        )
                }
            })()}

        </>)
}

export default VBInputField;