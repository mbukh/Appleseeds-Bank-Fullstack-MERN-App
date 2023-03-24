import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axios("/api/v1/users");
                const { data } = response;
                console.log(data.data);
                setPeople(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPeople();
    }, []);

    console.log(people);

    return (
        <div className="App">
            <h1>List of People</h1>
            <ul>
                {people.length > 0 &&
                    people.map((person) => (
                        <li key={person.id}>
                            {person.name}: {person.passportId} : {person.totalCash}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default App;
