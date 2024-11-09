import React, { useState, useEffect } from "react";

function Photos() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/photos");

                if (!response.ok) {
                    throw new Error("Faild to fatch");
                }

                const jsonData = await response.json();

                setData(jsonData.slice(0, 20));
            } catch (e) {
                console.error("Fetch error", e);
                setError(e.message || "Error");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading....</p>;
    }

    if (error) {
        return <p>Error {error}</p>;
    }

    console.log(data);

    return (
        <>
            <div>
                {data.map((item) => (
                    <div key={item.id}>
                        <img src={item.thumbnailUrl} alt="photo" />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Photos;