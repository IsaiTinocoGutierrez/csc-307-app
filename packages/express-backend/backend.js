// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  app.use(express.json());

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
//------------------

  const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
      users["users_list"].splice(index, 1);
      return true;
    }
    return false;
  };

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
  
    // Try to delete the user by ID
    const isDeleted = deleteUserById(id);
  
    if (isDeleted) {
      res.status(204).send(); // 204 No Content (successful deletion, no body)
    } else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  });
  
  // app.delete("/users/:id", (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     if (deleteUserById(id)) {
  //       res.status(200).send(`User  with ID ${id} deleted`);
  //     } else {
  //       res.status(404).send(`User  with ID ${id} not found`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(404).send(`User  with ID ${id} not found`);
  //   }
  // });

//----------------------------

  const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => user["name"] === name && user["job"] === job
    );
  };

//----------------------

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name && job) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.json(result);
      } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.json(result);
      } else {
        res.json(users); // if no filters, return all users
      }
    });

  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

  // app.post("/users", (req, res) => {
  //   const userToAdd = req.body;
  //   addUser(userToAdd);
  //   res.send();
  //   //res.status(201).json({ message: "User created successfully", user: userToAdd})
  // });

  //----------------------
// Function to generate a random ID
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 6); // Generate a random 6-character string
  };

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
  
     // Optional: Add validation for incoming data (e.g., name, job)
  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  // Generate a random ID for the new user
  const id = generateRandomId();

  // Create a new user object with the ID field first
  const newUser = {
   id: id,          // Add the ID first
    name: userToAdd.name,
    job: userToAdd.job,
  };

  // Add the user to the list
  addUser(newUser);

  // Respond with a 201 status and the newly created user
  res.status(201).json({ message: "User created successfully", user: userToAdd });
  });
//----------------------------
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
