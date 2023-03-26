import { useState } from "react";

import { userFields as fields } from "../constants/fields";

import SearchRow from "./SearchRow";
import UsersRow from "./UsersRow";
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

const UsersTable = ({ rows, query, setQuery }) => {
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
                        rows.map((entry) => <UsersRow key={entry.id} data={entry} />)
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9}>
                                Check your search criteria
                                <Loading />
                            </TableCell>
                        </TableRow>
                    )}
                    {newUsers.map((entry) => (
                        <UsersRow key={entry.id} data={entry} />
                    ))}
                    <AddUserRow renderNewUser={renderNewUser} />
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
