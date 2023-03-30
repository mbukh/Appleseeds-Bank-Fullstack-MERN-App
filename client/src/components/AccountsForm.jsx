import { useReducer, useRef, useState } from "react";

import * as api from "../service/api";
import { accountFields as fields } from "../constants/fields";

import {
    Box,
    Collapse,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const reducer = (state, payload) => {
    switch (type) {
        case "setTransactionUser":

        case "setTransactionAccount":

        case "setTransactionAmount":

        case "setWithdrawCash":

        case "setWithdrawCashAmount":

        case "setDepositCashAmount":

        case "setIncreaseCreditAmount":

        case "setDecreaseCreditAmount":

        case "transaction":
            // api.
            return { count: state.count + 1 };

        case "withdrawCash":
            // api.
            return { count: state.count + 1 };

        case "depositCash":
            // api.
            // api.
            return { count: state.count + 1 };

        case "increaseCredit":
            // api.
            return { count: state.count + 1 };

        case "decreaseCredit":
            // api.
            return { count: state.count + 1 };

        default:
            return state;
    }
};

const AccountsForm = ({ open }) => {
    const [query, dispatch] = useReducer(reducer, {});
    const [loading, setLoading] = useState(false);
    const timeout = useRef(null);

    const inputHandler = (value, key, type) => {
        clearTimeout(timeout.current);
        setQuery((prev) => ({
            ...prev,
            [key]: value,
        }));

        timeout.current = setTimeout(
            () =>
                setQuery({
                    ...query,
                    [key]: value,
                }),
            1000
        );
    };

    const handleChange = (event) => {
        setReceiverId(event.target.value);
    };

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Account Actions
                </Typography>
                <Table size="medium" aria-label="accounts">
                    <TableHead>
                        <TableRow>
                            {Object.entries(fields)
                                .filter(([_, value]) => value.actions)
                                .map(([key, value]) => (
                                    <TableCell key={key} align={value.align}>
                                        {value.actions.map((action) => (
                                            <Box
                                                key={action.key}
                                                mb={1}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                }}
                                            >
                                                <TextField
                                                    type="search"
                                                    label={action.title}
                                                    value={query[action.key] || ""}
                                                    onChange={(e) =>
                                                        inputHandler(
                                                            e.target.value,
                                                            action.key,
                                                            value.type
                                                        )
                                                    }
                                                    variant="standard"
                                                    size="small"
                                                    inputProps={{
                                                        style: { fontSize: "80%" },
                                                        inputMode: "numeric",
                                                        pattern: "[0-9]*",
                                                        min: 0,
                                                    }}
                                                    InputLabelProps={{
                                                        style: { fontSize: "80%" },
                                                    }}
                                                    fullWidth
                                                />
                                                {!action.hideButton && (
                                                    <LoadingButton
                                                        color="primary"
                                                        onClick={() =>
                                                            dispatch(action.key)
                                                        }
                                                        loading={loading}
                                                        loadingPosition="start"
                                                        startIcon={
                                                            <CurrencyExchangeIcon />
                                                        }
                                                        variant="contained"
                                                        size="small"
                                                        fullWidth
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: "80%",
                                                            }}
                                                        >
                                                            {action.title.split(" ")[0]}
                                                        </span>
                                                    </LoadingButton>
                                                )}
                                            </Box>
                                        ))}
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                </Table>
            </Box>
        </Collapse>
    );
};

export default AccountsForm;
