import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {API_USERS} from 'components/commons/module';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import VBInputField from "../components/shared-forms/VBInputField";
import PageTitle from "../components/shared-forms/PageTitle";
import VBButton from "../components/shared-forms/VBButton";
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";

const initialUser = {
        role: "User",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
}

const SignUp = () => {

    const [user, setUser] = useState(initialUser);

    const [error, setError] = useState({
        role: "User",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setUser({...user, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_USERS, user);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                setAlert({...alert, open: true, message: error.response.data.message});
            }
        }
    }
    const validateInput = e => {
        let {name, value} = e.target;
        setError(prev => {
            const stateObj = {...prev, [name]: ""};

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (user.confirmPassword && value !== user.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (user.password && value !== user.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }
    const FormFields = {
        schema: [
            {id: 'firstName', label: 'First Name', name: 'firstName', type: 'default', required: true},
            {id: 'lastName', label: 'Last Name', name: 'lastName', type: 'default', required: true},
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required: true},
            {id: 'password', label: 'Password', name: 'password', type: 'password', required: true},
            {id: 'confirmPassword', label: 'ConfirmPassword', name: 'confirmPassword', type: 'password', required: true}
        ]
    }
    //Callback functions that make up page
    const PageCallBack = {
        inputChange: (e) => {
            setUser({...user, [e.target.name]: e.target.value});
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <PageTitle title="Sign up"/>
            <FormControl>
                <RadioGroup
                    row
                    space-around
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={user.role}
                >
                    <FormControlLabel value="Admin" name="role" onChange={handleChange} control={<Radio/>}
                                      label="Admin"/>
                    <FormControlLabel value="User" name="role" onChange={handleChange} control={<Radio/>}
                                      label="User"/>
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                {FormFields.schema.map((form, idx) => (
                    <Grid key={`user-grid-${idx}`} item xs={12}
                          sm={(['firstName', 'lastName'].includes(form.id)) ? 6 : 12}>
                        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={user}
                                          cb={PageCallBack}/>
                    </Grid>
                ))}
            </Grid>
            <VBButton title="Sign Up" onClick={handleSubmit} fullWidth/>
            <Link href="/src/pages/Login" variant="body2">
                Sign in
            </Link>
            <SnackbarAlert alert={alert}/>
        </Container>
    );
};

export default SignUp;