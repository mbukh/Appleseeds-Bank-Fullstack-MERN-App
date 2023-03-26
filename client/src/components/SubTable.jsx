import { accountFields as fields } from "../constants/fields";
import { renderValue } from "../utils/utils";

import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const SubTable = ({ data, open }) => {
    return (
        data &&
        data.length && (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        User Accounts
                    </Typography>
                    <Table size="medium" aria-label="accounts">
                        <TableHead>
                            <TableRow>
                                {Object.entries(fields).map(([key, value]) => (
                                    <TableCell align={value.align} key={key}>
                                        {value.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((entry) => (
                                <TableRow key={entry.id}>
                                    {Object.entries(fields).map(([key, value]) => (
                                        <TableCell align={value.align} key={key}>
                                            {renderValue(entry, key)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        )
    );
};

export default SubTable;
