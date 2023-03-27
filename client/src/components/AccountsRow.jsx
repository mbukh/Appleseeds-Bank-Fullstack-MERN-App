import { useState } from "react";

import { accountFields as fields } from "../constants/fields";
import { formatDisplayValue } from "../utils/utils";

import AccountsForm from "./AccountsForm";

import {
    Box,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AccountsRow = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                size="small"
                aria-label="actions"
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="medium"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {Object.entries(fields).map(
                    ([key, value]) =>
                        value.render && (
                            <TableCell align={value.align} key={key}>
                                {formatDisplayValue(data, key)}
                            </TableCell>
                        )
                )}
            </TableRow>
            <TableRow>
                {/* <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} /> */}
                <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={6}>
                    <AccountsForm open={open} />
                </TableCell>
            </TableRow>
        </>
    );
};

export default AccountsRow;
