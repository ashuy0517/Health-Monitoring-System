import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:5000/health/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Health Data</h2>
      <Link to="/add-health">Add New Health Entry</Link>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            {new Date(item.date).toLocaleString()}: HR {item.heartRate} | BP {item.bloodPressure} | O2 {item.oxygenLevel}%
          </li>
        ))}
      </ul>
    </div>
  );
}
