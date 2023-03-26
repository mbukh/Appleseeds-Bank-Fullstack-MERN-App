import { useState, useEffect } from "react";

import "./App.css";

import * as api from "./service/api";

import CollapsibleTable from "./components/Table";
import Loading from "./components/Loading/Loading";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { success, data } = await api.getUsers();
            if (success) setData(data);
        };
        fetchData();
    }, []);

    return data.length ? <CollapsibleTable rows={data} /> : <Loading />;
}

export default App;
