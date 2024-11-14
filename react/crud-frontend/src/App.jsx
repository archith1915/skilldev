import react, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState();
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);

  const addToList = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = () => {
    axios.put("http://localhost:3001/update", {
      foodName: newFoodName,
      id: id,
    });
  };

  const deleteFood = (id) => {
    axios.delete("http://localhost:3001/delete", {
      id: id,
    });
  };

  return (
    <>
      <div className="App">
        <h1>CRUD APPLICATION</h1>
        <label>Food Name</label>
        <input type="text" onChange={(e) => setFoodName(e.target.value)} />
        <label>Days</label>
        <input type="number" onChange={(e) => setDays(e.target.value)} />
        <button onClick={addToList}>Add</button>

        <h1>Food list</h1>
        {foodList.map((val, key) => {
          return <div className="food" key={key}>
            <h1>{val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1> {" "}
            <input type="text" placeholder='New food name...' onChange={(e) => setFoodName(e.target.value)} />
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>;
        })}
      </div>
    </>
  );
}

export default App;
