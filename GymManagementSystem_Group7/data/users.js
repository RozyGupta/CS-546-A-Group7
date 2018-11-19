const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const uuid = require('uuid/v1');
const bcrypt = require("bcrypt");
const saltRounds = 16;

const exportedMethods = {

    async adduser(firstname, lastname, username, password, mobile, email, street, apt, city, state, country, zipcode, dob, gender) {
        //if (!title) throw "No title provided";
        //if (!ingredients) throw "No ingredients provided!";
        //if (!steps) throw "No steps provided";
        const plainTextPassword = password;
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        const userCollection = await user();

        const newuser = {
            _id: uuid(),
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hash,
            mobile: mobile,
            email: email,
            street: street,
            apt: apt,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode,
            dob: dob,
            gender: gender
        };

        const addeduser = await userCollection.insertOne(newuser);
        if (addeduser.insertedCount === 0) {
            throw "Could not add user successfully";
        }
        //const newId  = addeduser.insertedId;
        //return await this.getuserById(newId);
    },

    async getUserById(id) {
        //if (!username) throw "You must provide an id to search for";
        const userCollection = await user();
        const user = await userCollection.findOne({ _id: id });
        if (user === null) throw `No recipe with id of ${id}`;

        return user;

    },
    async getAllUsers() {
        const userCollection = await user();

        const getUsers = await userCollection.find({}).toArray();

        return getUsers;

    },

    async checkCredentials(username, password) {
        let users = await this.getAllUsers();
        for (let i = 0; i < users.length; i++) {
            if (username === users[i].username) {
                console.log(true);
                let passwordMatch = await (bcrypt.compare(password, users[i].password));
                if (passwordMatch) {
                    console.log(true);
                    let user = users[i];
                    console.log(user);
                    return {
                        status: true,
                        user
                    };
                }
                else {
                    return {
                        status: false,
                        message: "Invalid user"
                    };

                }
            }

        }
        return {
            status: false,
            message: "Invalid user"
        };
    },

}
module.exports = exportedMethods;

    /*async adduser(title,ingredients,steps) {
      if (!title) throw "No title provided";
      if (!ingredients) throw "No ingredients provided!";
      if (!steps) throw "No steps provided";
  
      const recipeCollection = await recipes();
  
      const newUser = {
        _id: uuid(),
        username: username,
        hashedPassword:hash,
        steps:steps*/

