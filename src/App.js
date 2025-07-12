import Content from "./Component/Content";
import Footer from "./Component/Footer";
import Top from "./Component/Top";
import AddList from "./Component/AddList";
import request from "./Component/Request";
import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const API_url = "/data/db.json";
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log("Fetched data:", data);
      setList(data.items);
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add new Item to the list
  const addItems = async (item) => {
    const id = list.length ? list[list.length - 1].id + 1 : 1;
    const theNewItem = {
      id,
      checked: false,
      item,
    };

    const listItem = [...list, theNewItem];
    setList(listItem);

    const postOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(theNewItem),
    };
    const result = await request(API_url, postOptions);
    if (result) setError(result);
  };

  //  Create a function to update the checked property

  const handleCheck = async (id) => {
    const listItem = list.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );

    setList(listItem);

    const myitem = listItem.find((list) => list.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        checked: myitem.checked,
      }),
    };

    const reqUrl = `${API_url}/${id}`;

    const result = await request(reqUrl, updateOptions);

    if (result) setError(result);
  };

  //  create a function to delete an item

  const handleDelete = async (id) => {
    const listItem = list.filter((item) => item.id !== id);

    setList(listItem);

    const deleteOptions = {
      method: "DELETE",
    };

    const reqUrl = `${API_url}/${id}`;

    const result = await request(reqUrl, deleteOptions);

    if (result) setError(result);
  };

  // function to update the list item
  const updateItem = async (id, updatedText) => {
    const updatedList = list.map((x) =>
      x.id === id ? { ...x, item: updatedText } : x
    );

    setList(updatedList);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ item: updatedList }),
    };

    const reqUrl = `${API_url}/${id}`;

    const result = await request(reqUrl, updateOptions);
    if (result) setError(result);
  };

  //  create a function to prevent default submit action
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem.trim()) return;

    if (edit !== null) {
      updateItem(edit, newItem);
    } else {
      addItems(newItem);
    }

    setNewItem("");
    setEdit(null);
  };

  const handleEdit = (id) => {
    const current = list.find((todo) => todo.id == id);
    console.log(current);
    setNewItem(current.item);
    setEdit(id);
  };

  return (
    <div className="App">
      <Top />

      <AddList
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <Content
        list={list}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Footer list={list} />
    </div>
  );
}

export default App;
