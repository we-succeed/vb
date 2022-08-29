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


const initialTx = {
    from: '',
    to: '',
    amount: '',
    source: '',
    type: '',
}

const TxHistory = (props) => {
  const [txs, setTxs] = useState([]);
  const [tx, setTx] = useState(initialTx);

  useEffect(() => {
    getData();
  }, [props.data])

  const getData = () => {
    axios.get(`http://localhost:5003/api/tx/${props.data._id}`)
        .then((res) => {
          setTxs(res.data.userAccount.transactions);     
        });
      }

  return (
    <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Transaction History
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>from</TableCell>
                            <TableCell>to</TableCell>
                            <TableCell>amount</TableCell>
                            <TableCell>source</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {txs && txs.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, 'cursor':'pointer'}}                                
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.from}</TableCell>
                                <TableCell>{row.to.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.source}</TableCell>                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
  );
};


export default TxHistory;