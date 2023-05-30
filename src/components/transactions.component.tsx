import React, {useState} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TransactionsService from "../services/transactions.service";
import {TransactionsDto} from "../dto/transactions.dto";

export function Transactions() {
    const defaultTransaction: TransactionsDto = {
        trans_token: []
    };

    const [transactions, setTransaction] = useState<TransactionsDto>(defaultTransaction);

    TransactionsService.transactions().then(
        response => {
            setTransaction(response.data)
        },
    );

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Balance</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions ? (transactions.trans_token.map((t) => (
                        <TableRow
                            key={t.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {t.date}
                            </TableCell>
                            <TableCell align="center">{t.username}</TableCell>
                            <TableCell align="center">{t.amount}</TableCell>
                            <TableCell align="center">{t.balance}</TableCell>
                        </TableRow>
                    ))) : <div>Список транзакций пуст</div>}
            </TableBody>
        </Table>
    </TableContainer>
}
