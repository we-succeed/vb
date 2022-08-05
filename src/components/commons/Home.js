import React from "react";
import {Button, Container, Grid, Link, Typography} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Home() {
  return (
      <>
        <div>
          <Container maxWidth='lg'>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src="https://picsum.photos/id/1043/400/300.jpg"/>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  Unlimited backing transcriptions
                </Typography>
                <Typography variant="h6">
                  Annual fee rebate on select DV credit cards
                </Typography>
                <Typography variant="h6">
                  Free cheques, drafts & more
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary">
                  JOIN NOW
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div>
          <Container>
            <Typography variant="h5" align="center">Welcome to DV ONLINE Banking</Typography>
            <Grid container spacing={3}>
              <Grid item xs>
                <StarsIcon fontSize="large"/>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Typography>
              </Grid>
              <Grid item xs>
                <PermPhoneMsgIcon color="primary"/>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Typography>
              </Grid>
              <Grid item xs>
                <AccountBalanceIcon color="primary"/>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src="https://picsum.photos/id/1043/600/400.jpg"/>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" style={{marginBottom: '60px',  fontWeight:"bold"}}>
                  Easier to transfer
                </Typography>
                <Typography variant="body2" >
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been
                  the industry's standard dummy text ever since the 1500s, when an unknown printer
                  took a galley
                  of type and scrambled it to make a type specimen book. It has survived not only five
                  centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item x>
                <Typography variant="h5">
                  DV EVERY DAY <br/> SAVING ACCOUNT
                </Typography>
                <Typography variant="subtitle1">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Typography>
                <table>
                  <tr>
                    <td style={{width: '350px'}}>
                      <Typography variant="subtitle1" >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="subtitle1" >
                        Monthly
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="h5">
                        Unlimited
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h5">
                        $0
                      </Typography>
                    </td>
                  </tr>
                </table>
                <Link
                    component="button"
                    variant="h6"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                >
                  <Typography variant="h6">
                    Open account
                  </Typography>
                </Link>

              </Grid>
              <Grid item xs>
                <img src="https://picsum.photos/id/1043/600/400.jpg"/>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div>
          <Container>
            <Typography variant="h5" align="left">DV BANK</Typography>
            <Typography variant="h5" align="left">ANY WARE, ANY
              TIME</Typography>
            <Grid spacing={3} container
                  direction="row"
                  justify="center"
                  alignItems="center">
              <Grid item xs={6} spacing={0}>
                <img src='https://picsum.photos/id/164/400/300.jpg'/>
                <Typography variant="subtitle2" align="left">Travel</Typography>
              </Grid>
              <Grid item xs={6} spacing={0}>
                <img src='https://picsum.photos/id/164/400/300.jpg'/>
                <Typography variant="subtitle2" align="left">Diversity</Typography>
              </Grid>
              <Grid item xs={6} spacing={0}>
                <img src='https://picsum.photos/id/164/400/300.jpg'/>
                <Typography variant="subtitle2" align="left">Children's Library</Typography>
              </Grid>
              <Grid item xs={6} spacing={0}>
                <img src='https://picsum.photos/id/164/400/300.jpg'/>
                <Typography variant="subtitle2" align="left">Treedays</Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </>
  );
}