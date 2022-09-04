import * as React from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {IconButton, Switch, TablePagination} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TableContainer from "@mui/material/TableContainer";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";


const DynamicTable = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState(props.data);
    const [form, setForm] = useState(props.form);
    useEffect(()=> {
        setData(props.data);
        setForm(props.form);
    },[props.form, props.data])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
    };
    const getHeader = () => {
        return (
            <TableHead>
                <TableRow sx={{fontWeigh: 500}}>
                    <TableCell component="th" scope="row">
                        No
                    </TableCell>
                    {form.schema.map((key) => {
                        return (
                            <TableCell component="th" scope="row">
                                {key['head']}
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
        )
    }

    const getRenderRow = (data) => {
        return form.schema.map((key, idx) => {
            if (key['format'] === 'btnGroup')
                return (
                    <TableCell key={idx}>
                        <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={()=>form.cb.handleEdit(data)}
                           >
                            <EditOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            size="small"
                            sx={{
                                color: "#ff4d4d",
                                '&:hover': {
                                    background: 'none',
                                }
                            }}
                            onClick={()=>form.cb.handleDelete(data)}
                        >
                            <DeleteOutlineIcon fontSize="inherit"/>
                        </IconButton>
                    </TableCell>
                )
            else if(key['format'] === 'nameField')
                return (
                        <TableCell>
                            {data[key['cols'][0]] +' '+ data[key['cols'][1]]}
                        </TableCell>
                )
            else if(key['format'] === 'toggle')
                return (
                <TableCell>
                    <Switch
                        disabled
                        checked={data[key['cols']]}
                    />
                </TableCell>)
            else if(key['format'] === 'count')
                return <TableCell key={idx}>{data[key['cols']].length}</TableCell>
            else if(key['format'] === 'date')
                return <TableCell key={idx}>{new Date(data[key['cols']]).toLocaleString()}</TableCell>
            else {
                let field = ""
                if (key['cols'].includes('.')){
                    const colsArr = key['cols'].split('.');
                    field = data[colsArr[0]];
                    for ( let i = 1; i < colsArr.length; i++) {
                        field = field[colsArr[i]];
                    }
                } else
                    field = data[key['cols']];
                return <TableCell key={idx}>{field}</TableCell>
            }
        })
    }
    const getRowsData = () => {
        return (
            data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, idx) => (
                <TableRow
                    key={row.id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}, 'cursor': 'pointer'}}
                >
                    <TableCell component="th" scope="row">
                        {page * rowsPerPage + idx + 1}
                    </TableCell>
                    {getRenderRow(row)}
                </TableRow>
            )))
    }
    return (
        <>
            {data && data.length ===0?
                <Typography variant="h5" gutterBottom component="div" mt={2}>
                No data
                </Typography>
                :
                <TableContainer>
                    <Table aria-label="simple table">
                        {getHeader()}
                        <TableBody>
                            {getRowsData()}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            }
        </>

    )
}

export default DynamicTable;