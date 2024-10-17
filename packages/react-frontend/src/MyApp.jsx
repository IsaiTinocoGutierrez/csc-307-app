// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // function postUser(person) {
  //   const promise = fetch("Http://localhost:8000/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(person)
  //   });
  
  //   return promise;
  // }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function removeOneCharacter(id) {
    // Make a DELETE request to the backend
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // If the deletion is successful, update the frontend state
          const updated = characters.filter((character) => character.id !== id);
          setCharacters(updated);
        } else if (response.status === 404) {
          console.log(`User with ID ${id} not found.`);
        } else {
          throw new Error(`Failed to delete user. Status code: ${response.status}`);
        }
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  }

  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  // function updateList(person) {
  //   postUser(person)
  //     .then(() => setCharacters([...characters, person]))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        // Check if the response status is 201 (Created)
        if (response.status === 201) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(`Failed to create user. Status code: ${response.status}`);
        }
      })
      .then((data) => {
        // If the user is created successfully, update the state
        setCharacters([...characters, data.user]);
      })
      .catch((error) => {
        console.log("Error creating user:", error);
      });
  }

    function submitForm(person) {
    updateList(person);
  }

  // function submitForm() {
  //   props.handleSubmit(person);
  //   setPerson({ name: "", job: "" });
  // }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );  
}


export  default MyApp;
