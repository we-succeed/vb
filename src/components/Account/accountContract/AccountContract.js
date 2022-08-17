import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Step, StepLabel, Stepper} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountInfoForm from "./AccountInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import AccountReview from "./AccountReview";

const steps = ['Account Information', 'Additional Information', 'Review your account'];


export default function AccountContract(props) {
    const params = useParams();
    const [user, setUser] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step, data) {
        switch (step) {
            case 0:
                return <AccountInfoForm data={data}/>;
            case 1:
                return <AdditionalInfoForm data={data}/>;
            case 2:
                return <AccountReview data={data}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    useEffect(() => {
        getData()
    }, [params.accountId])
    const getData = () => {
        fetch(`http://localhost:5000/api/accounts/${params.accountId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user_id': props.auth.id}),
        })
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
            setIsLoading(true);
        });
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
                                    Your account number is #2001539. We have emailed your opening
                                    account, and will send you an update when your account has
                                    opened.
                                </Typography>
                            </>
                        ) : (
                            <>
                                {isLoading && getStepContent(activeStep, user)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
            </Container>
        </>
    )
}