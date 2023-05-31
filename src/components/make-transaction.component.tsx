import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Button, Snackbar, TextField } from "@mui/material";
import UsersService from '../services/users.service';
import { UserListItem } from '../dto/user-list-item.dto';
import './make-transaction.css'
import transactionsService from '../services/transactions.service';

export function MakeTransaction() {
    function transferMoney(){
        transactionsService.transfer(selectedUser, amount).then(
            response => {
                setSuccessOpen(true)
            },
            error => {
                setErrorMsgOpen(true)
            }
        );
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorMsgOpen(false);
    };

    const [errorMsgOpen, setErrorMsgOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [input, setInput] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<string>("")
    const [users, setUsers] = useState<UserListItem[]>([])

    useEffect(() => {
        if (input != ""){
            UsersService.users(input).then(
                response => {
                    setUsers(response)
                },
            );
        }
    }, [input]);

    return <div className="container">
        <Autocomplete
            className="inline"
            disablePortal
            onChange={(event, value) => value ? setSelectedUser(value.name) : setSelectedUser("")}
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField onChange={e => setInput(e.target.value)} {...params} label="Users" />}
        />
        <TextField type="number" className="inline" id="outlined-basic" label="Amount" variant="outlined" onChange={e => setAmount(parseInt(e.target.value))} />

        <Button className="inline" variant="contained" color="success" onClick={transferMoney}>
            Confirm
        </Button>

        <Snackbar open={errorMsgOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error
            </Alert>
        </Snackbar>

        <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Success
            </Alert>
        </Snackbar>
    </div>
}
