import { useState } from "react";

import * as api from "../service/api";
import { accountFields as fields } from "../constants/fields";

import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const AccountsForm = ({}) => {
    const [loading, setLoading] = useState(false);
    const [receiverId, setReceiverId] = useState("");

    const handleChange = (event) => {
        setReceiverId(event.target.value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
            }}
        >
            {Object.entries(fields)
                .filter(([_, value]) => value.register)
                .map(([key, value]) => (
                    <TextField
                        key={key}
                        style={{ flex: value.short ? 2 : 4 }}
                        required
                        type={value.type}
                        label={value.title}
                        value={user[key] || ""}
                        onChange={(e) =>
                            setUser((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                            }))
                        }
                        variant="outlined"
                        size="small"
                    />
                ))}

            <TextField
                style={{ flex: true ? 2 : 4 }}
                required
                type=""
                label=""
                value=""
                onChange={(e) => {}}
                variant="outlined"
                size="small"
            />

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="receiver-account">Age</InputLabel>
                <Select
                    labelId="receiver-account"
                    value={receiverId}
                    label="Age *"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <div>
                <LoadingButton
                    color="success"
                    onClick={() => {}}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<CurrencyExchangeIcon />}
                    variant="contained"
                >
                    <span>Send money</span>
                </LoadingButton>
            </div>
        </Box>
    );
};

export default AccountsForm;
