import {useState} from "react";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Step, StepLabel, Stepper} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountInfoForm from "./AccountInfoForm";
import UserAccountForm from "./UserAccountForm";
import AccountReview from "./AccountReview";
import {API_OPEN_ACCOUNT, getApiRoute} from "../../commons/module";
import axios from "axios";

const steps = ['Account Information', 'Additional Information', 'Review your account'];

export default function AccountContract(props) {
    const params = useParams();
    const [account] = useState(props.state.account);
    const [activeStep, setActiveStep] = useState(0);
    const [userAccount, setUserAccount] = useState({
        name: '',
        description: '',
        accountNumber: 0
    });
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleChange = (e) => {
        const newdata = {...userAccount}
        newdata[e.target.name] = e.target.value
        setUserAccount(newdata)
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AccountInfoForm account={account}/>;
            case 1:
                return <UserAccountForm userAccount={userAccount} onHandleChange={handleChange}/>;
            case 2:
                return <AccountReview account={account} userAccount={userAccount}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleSubmit = async () => {
        let data = {userAccount}
        const result = await axios.post(getApiRoute(API_OPEN_ACCOUNT, {'accountId': params.accountId}), data);
        if (result.status === 201) {
            setActiveStep(activeStep + 1);
            setUserAccount((prevState) => ({
                ...prevState,
                accountNumber: result.data.number,
            }));
        }
    }
    return (
        <>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for opening an account.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your account number is #{userAccount.accountNumber}. We have emailed your opening
                                    account, and will send you an update when your account has
                                    opened.
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ?
                                        <>
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmit}
                                                sx={{mt: 3, ml: 1}}>
                                                Create Account
                                            </Button>
                                        </> : <>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{mt: 3, ml: 1}}
                                            >
                                                Next
                                            </Button>
                                        </>}
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
            </Container>
        </>
    )
}