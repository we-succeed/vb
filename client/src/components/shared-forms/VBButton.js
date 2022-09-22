import * as React from 'react';
import Button from "@mui/material/Button";


const VBButton = (props) => {
    return (
        <>
            <Button
                fullWidth={(props.fullWidth)}
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    background:'primary',
                    padding: '14px',
                    '&:hover': {
                        background: '#394A6A'
                    },
                    boxShadow:'none'
                    }}
                onClick={props.onClick}               
            >
                {props.title}
            </Button>
        </>
    )
}
export default VBButton