import { useState } from "react";

import { userFields as fields } from "../constants/fields";

import Row from "./Row";
import SearchRow from "./SearchRow";
import AddUserRow from "./AddUserRow";

import Loading from "./Loading/Loading";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function CollapsibleTable({ rows, query, setQuery }) {
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
                    <SearchRow query={query} setQuery={setQuery} />
                    {rows.length ? (
                        rows.map((entry) => <Row key={entry.id} data={entry} />)
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9}>
                                Check your search criteria
                                <Loading />
                            </TableCell>
                        </TableRow>
                    )}
                    {newUsers.map((entry) => (
                        <Row key={entry.id} data={entry} />
                    ))}
                    <AddUserRow renderNewUser={renderNewUser} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}
