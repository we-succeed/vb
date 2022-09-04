import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import axios from "axios";


const initialTr = {
    from: '',
    to: '',
    amount: '',
    desc: '',
    type: '',
}

const TransferHistory = (props) => {
  const [transfers, setTransfers] = useState([]);
  const [transfer, setTransfer] = useState(initialTr);

  useEffect(() => {
    getData();
  }, [props.data])

  const getData = () => {
    axios.get(`http://localhost:5003/api/transfer/${props.data._id}`)
        .then((res) => {
          setTransfers(res.data.userAccount.transfers);     
        });
      }

  return (
    <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Transfer History
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>from</TableCell>
                            <TableCell>to</TableCell>
                            <TableCell>amount</TableCell>
                            <TableCell>desc</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transfers && transfers.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, 'cursor':'pointer'}}                                
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.from}</TableCell>
                                <TableCell>{row.to.email}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.desc}</TableCell>                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
  );
};


export default TransferHistory;