import Typography from "@mui/material/Typography";
import * as React from 'react';


const PageTitle = (props) => {
    return(
        <>
            <Typography component="h1" variant="h5" gutterBottom>
                {props.title}
            </Typography>
        </>
    )
}

export default PageTitle;