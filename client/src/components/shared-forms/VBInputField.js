import * as React from 'react';
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Switch
} from "@mui/material";
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
                    case 'confirmPassword':
                        return (
                            <FormControl sx={{mt: 1, mb: 1}}
                                         variant="outlined" fullWidth error={(props.errors && props.errors[props.form.name].status)}>
                                <InputLabel 
                                htmlFor="outlined-adornment-password">{props.form.label}</InputLabel>
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
                                {(props.errors && props.errors[props.form.name].status) ? (
                                        <FormHelperText id="component-error-text" sx={{marginLeft: '0px'}}>{props.errors[props.form.name].message}</FormHelperText>
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
                    case 'select':
                        return (
                            <>
                                <FormControl fullWidth  sx={{mt: 1, mb: 1}}>
                                    <InputLabel id="demo-simple-select-label">{props.form.label}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={props.form.name}
                                        label={props.form.name}
                                        value={props.data[props.form.name]}
                                        onChange={props.cb.selectChange}
                                    >
                                        {props.form.select.list && props.form.select.list
                                            .map((row, idx) => (
                                                <MenuItem
                                                    key={idx}
                                                    value={row[props.form.select.value]}>
                                                    {row[props.form.select.fields[0]]} - ({row[props.form.select.fields[1]]})
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </>
                        )
                    default:
                        return (
                            <FormControl sx={{mt: 1, mb: 1}}
                                         variant="outlined" fullWidth
                                         error={(props.errors && props.errors[props.form.name].status)}
                            >
                                <InputLabel htmlFor="component-error">{props.form.label}</InputLabel>
                                <OutlinedInput
                                    required={(props.form.required)}
                                    fullWidth
                                    type={(props.form.type === 'default')? 'text': 'number'}
                                    id={props.form.id}
                                    label={props.form.label}
                                    name={props.form.name}
                                    value={props.data[props.form.name]}
                                    autoComplete="off"
                                    disabled={(props.form.disabled)}
                                    onChange={props.cb.inputChange}
                                    onBlur={props.cb.inputBlur}
                                />
                                {(props.errors && props.errors[props.form.name].status) ? (
                                        <FormHelperText id="component-error-text"  sx={{marginLeft: '0px'}}>{props.errors[props.form.name].message}</FormHelperText>
                                    )
                                    : ""
                                }
                            </FormControl>
                        )
                }
            })()}

        </>)
}

export default VBInputField;