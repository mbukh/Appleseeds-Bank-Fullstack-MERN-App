import { useRef, useState } from "react";

import { userFields as fields } from "../constants/fields";

import { TableCell, TableRow, TextField } from "@mui/material";

const SearchRow = ({ query, setQuery }) => {
    const [search, setSearch] = useState(query);
    const timeout = useRef(null);

    const searchHandler = (value, key, type) => {
        clearTimeout(timeout.current);
        setSearch((prev) => ({
            ...prev,
            [key]: value,
        }));

        timeout.current = setTimeout(
            () =>
                setQuery({
                    ...search,
                    [key]: value,
                }),
            1000
        );
    };

    return (
        <TableRow>
            {Object.entries(fields).map(([key, value]) => (
                <TableCell key={key} align={value.align}>
                    {value.searchable &&
                        (value.searchedBy || [{ key: key, title: value.title }]).map(
                            (alias) => (
                                <TextField
                                    key={alias.key}
                                    type="search"
                                    label={alias.title}
                                    value={search[alias.key] || ""}
                                    onChange={(e) =>
                                        searchHandler(
                                            e.target.value,
                                            alias.key,
                                            value.type
                                        )
                                    }
                                    variant="standard"
                                    size="small"
                                    inputProps={{ style: { fontSize: "80%" } }}
                                    InputLabelProps={{ style: { fontSize: "80%" } }}
                                    fullWidth
                                />
                            )
                        )}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default SearchRow;
