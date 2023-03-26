import { useState } from "react";

import { userFields as fields } from "../constants/fields";

import Row from "./Row";
import AddUserRow from "./AddUserRow";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function CollapsibleTable({ rows }) {
    const [newUsers, setNewUsers] = useState([]);

    const renderNewUser = (data) => {
        setNewUsers((prev) => [...prev, { ...data, isNew: true }]);
    };

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="users">
                <TableHead>
                    <TableRow>
                        {Object.entries(fields).map(([key, value]) => (
                            <TableCell key={key} align={value.align}>
                                {value.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((entry) => (
                        <Row key={entry.id} data={entry} />
                    ))}
                    {newUsers.map((entry) => (
                        <Row key={entry.id} data={entry} />
                    ))}
                    <AddUserRow renderNewUser={renderNewUser} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}
