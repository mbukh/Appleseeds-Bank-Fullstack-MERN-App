import { useState } from "react";

import { userFields as fields } from "../constants/fields";
import { formatDisplayValue } from "../utils/utils";

import * as api from "../service/api";

import AccountsTable from "./AccountsTable";

import { Switch, IconButton, TableCell, TableRow, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const UsersRow = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(data.active);
    const [removed, setRemoved] = useState(false);

    const switchActiveHandler = async () => {
        setActive((prev) => !prev);
        const { success } = await api.updateUser(data.id, { active: !active });
        if (!success) setActive((prev) => !prev);
    };

    const removeUserHandler = async () => {
        const { success } = await api.deleteUser(data.id);
        if (success) setRemoved(true);
    };

    if (removed) return;

    return (
        <>
            <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                style={!active ? { opacity: "60%" } : {}}
            >
                <TableCell align="center">
                    {active ? (
                        <IconButton
                            aria-label="expand row"
                            size="medium"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    ) : (
                        <Fab
                            size="small"
                            color="error"
                            onClick={removeUserHandler}
                            aria-label="remove"
                        >
                            <PersonRemoveIcon fontSize="small" />
                        </Fab>
                    )}
                </TableCell>
                <TableCell align="center">
                    <Switch checked={active} onChange={switchActiveHandler} />
                </TableCell>
                {Object.entries(fields).map(
                    ([key, value]) =>
                        value.render && (
                            <TableCell key={key} align={value.align}>
                                {formatDisplayValue(data, key)}
                            </TableCell>
                        )
                )}
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} />
                <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={8}>
                    <AccountsTable data={data.accounts} open={open && active} />
                </TableCell>
            </TableRow>
        </>
    );
};

export default UsersRow;
