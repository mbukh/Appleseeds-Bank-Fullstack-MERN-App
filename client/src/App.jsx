import { useState, useEffect } from "react";

import * as api from "./service/api";
import UsersTable from "./components/UsersTable";

import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState({});

    useEffect(() => {
        setData([]);
        const fetchData = async () => {
            const { success, data } = await api.getUsers(query);
            if (success) setData(data);
        };
        fetchData();
    }, [query]);

    return <UsersTable rows={data} query={query} setQuery={setQuery} />;
}

export default App;
