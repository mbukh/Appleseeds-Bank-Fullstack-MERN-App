import { accountFields as fields } from "../constants/fields";

import AccountsRow from "./AccountsRow";

import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const AccountsTable = ({ data, open }) => {
    return (
        data &&
        data.length && (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        User Accounts
                    </Typography>
                    <Table size="medium" aria-label="accounts">
                        <TableHead>
                            <TableRow>
                                {Object.entries(fields).map(([key, value]) => (
                                    <TableCell align={value.align} key={key}>
                                        {value.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((entry) => (
                                <AccountsRow key={entry.id} data={entry} />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        )
    );
};

export default AccountsTable;
