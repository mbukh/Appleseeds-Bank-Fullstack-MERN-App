import { useState, useEffect } from "react";

import "./App.css";

import * as api from "./service/api";

import CollapsibleTable from "./components/Table";

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

    return <CollapsibleTable rows={data} query={query} setQuery={setQuery} />;
}

export default App;
