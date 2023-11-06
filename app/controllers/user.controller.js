const User = require("../models/user.model.js");
var bcrypt = require('bcryptjs');
// Create and Save a new User
exports.create = (req, res) => {
    const { name, username, email, password, no_telp } = req.body;

    // Validate user input
    if (!(email && password && name && username && no_telp)) {
        res.status(400).send({
            message:
            err.message || "All input is required"
        });
    }

    User.findOne(email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            bcrypt.hash(password, 10, (error, hashedPassword)=> {
                if(error) { 
                    res.status(500).send({
                        message:
                        error
                    });
                } 
                // Create a User
                const user = new User({
                    name: name,
                    username: username,
                    password: hashedPassword,
                    email: email.toLowerCase(),
                    no_telp: no_telp
                });  

                // Save User in the database
                User.create(user, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Tutorial."
                    });
                    else res.send(data);
                });
            });
          } else {
            res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
            });
          }
        } else {
            res.status(409).send({
                message: "User Already Exist. Please Login"
            });
        }
    });

    

    
};

exports.findAll = (req, res) => {
    const name = req.query.name;
  
    User.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findOne(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};
