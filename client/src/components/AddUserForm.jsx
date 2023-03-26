import { useState } from "react";

import * as api from "../service/api";
import { userFields as fields } from "../constants/fields";

import { Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddUserForm = ({ user, setUser, setError, renderNewUser }) => {
    const [loading, setLoading] = useState(false);

    const addUserHandler = async () => {
        setLoading(true);
        const { success, data, error } = await api.createUser(user);
        if (success) {
            setUser({});
            renderNewUser(data);
        }
        error && setError(error);
        setLoading(false);
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
            <div>
                <LoadingButton
                    color="success"
                    onClick={addUserHandler}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                >
                    <span>Add&nbsp;User</span>
                </LoadingButton>
            </div>
        </Box>
    );
};

export default AddUserForm;
