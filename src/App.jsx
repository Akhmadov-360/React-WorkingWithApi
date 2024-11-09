import React, { useEffect, useState } from "react";
import Photos from "./Photos";
import Comments from "./Comments";
import Users from "./Users";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

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
    };

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
            <p>Title: {item.title}</p>
          </div>
        ))}

        <Photos />
        <Comments />
        <Users />
      </div>
    </>
  );
}

export default App;