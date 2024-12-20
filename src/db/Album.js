import React, { useState, useEffect } from 'react';
import axios from "axios";


const Album = () => {

    const [albums, setAlbum] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ title: "" });
    const [editingAlbum, setEditingAlbum] = useState(null);

    // Fetching Albul
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/albums")

            .then((response) => {
                setAlbum(response.data)
            })
            .catch((error) => console.log("Error fetching albums : ", error));
    }, []);

    // Adding new Album
    const addAlbum = (e) => {
        e.preventDefault();
        axios
            .post("https://jsonplaceholder.typicode.com/albums", {
                title: newAlbum.title,
                userId: 1,
            })
            .then((response) => {
                setAlbum((prev) => [...prev, response.data])
                setNewAlbum({ title: "" });
            })
            .catch((error) => console.log("Error addding album: ", error))
    }

    // Updating the Album
    const updateAlbum = (e) => {
        e.preventDefault();
        axios
          .put(`https://jsonplaceholder.typicode.com/albums/${editingAlbum.id}`, {
            title: editingAlbum.title,
          })
          .then((response) => {
            setAlbum((prev) =>
              prev.map((album) =>
                album.id === editingAlbum.id ? response.data : album
              )
            );
            setEditingAlbum(null);
          })
          .catch((error) => console.error("Error updating album:", error));
      };
      

    // Deleting an Album
    const deleteAlbum = (id) => {
        axios
          .delete(`https://jsonplaceholder.typicode.com/albums/${id}`)
          .then(() => {
            setAlbum((prev) => prev.filter((album) => album.id !== id));
          })
          .catch((error) => console.error("Error deleting album:", error));
      };
      

    return (<>
        <div style={{ padding: "20px" }}>
            <h1>Albul  List</h1>

            {editingAlbum && (
                <form onSubmit={addAlbum}>
                    <input
                        type='text' placeholder='New Album Title'
                        value={newAlbum.title}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })} />
                    <button type='submit'>Update Album</button>
                    <button onClick={() => setEditingAlbum(null)}>Cancel</button>
                </form>
            )}
        </div>
        <ul>
            {albums.map((album) => (
                <li key={album.id}>
                    {album.title}{" "}
                    <button onClick={() => setEditingAlbum(album)}>Edit</button>{" "}
                    <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </>)
}

export default Album;
