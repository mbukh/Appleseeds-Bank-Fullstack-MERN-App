import { useState } from "react";

import AddUserForm from "./AddUserForm";

import {
    Box,
    Collapse,
    Fab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddUserRow = ({ renderNewUser }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});

    return (
        <>
            <TableRow>
                <TableCell sx={{ border: "none" }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Create Account
                            </Typography>
                            {error && (
                                <Typography variant="" color="red" component="div">
                                    {error}
                                </Typography>
                            )}
                            <Table size="medium" aria-label="accounts">
                                <TableBody>
                                    <TableRow>
                                        <AddUserForm
                                            user={user}
                                            setUser={setUser}
                                            setError={setError}
                                            renderNewUser={renderNewUser}
                                        />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell sx={{ border: "none" }} colSpan={9} align="center">
                    <Fab
                        size="small"
                        color={open ? "success" : "primary"}
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="add"
                    >
                        <PersonAddIcon fontSize="small" />
                    </Fab>
                </TableCell>
            </TableRow>
        </>
    );
};

export default AddUserRow;
