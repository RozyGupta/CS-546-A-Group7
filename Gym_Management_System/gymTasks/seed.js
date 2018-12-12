const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.user;
const activities = data.activity;
const gymMembers = data.gymMember
const notice = data.notice;
const trainer = data.trainer;
const memberships = data.membership;
const authentication = data.authentication;
const session = data.session;
const workoutActivityAdmin = data.workoutActivity;
const workoutMember = data.workoutMember;

const main = async () => {
const db = await dbConnection();
let userInfo ={
firstname: "Patrick",
lastname: "Hill",
username: "patrickhill",
password: "Welcome123",
mobile: 1234567898,
email:"phill@stevens.edu",
streetAddress:"1 Castle Point",
aptno:"C02",
city:"JERSEY CITY",
state:"New Jersey",
country:"United States",
zipCode:"07304",
dob:"11/23/1986",
role:"ADMIN",
gender:"Male"
}
let userInfo1 ={
    firstname: "Adam",
    lastname: "Smith",
    username: "adamsmith",
    password: "Welcome123",
    mobile: 1234567898,
    email:"asmith@stevens.edu",
    streetAddress:"2 Castle Point",
    aptno:"C03",
    city:"JERSEY CITY",
    state:"New Jersey",
    country:"United States",
    zipCode:"07304",
    dob:"1/25/1986",
    role:"TRAINER",
    gender:"Male"
    }
    let userInfo2 ={
        firstname: "Joe",
        lastname: "Jonas",
        username: "joejonas",
        password: "Welcome123",
        mobile: 1234567898,
        email:"jjonas@stevens.edu",
        streetAddress:"3 Castle Point",
        aptno:"C03",
        city:"JERSEY CITY",
        state:"New Jersey",
        country:"United States",
        zipCode:"07304",
        dob:"2/2/1989",
        role:"gymMember",
        gender:"Male"
        }
    const user = await users.createUser(userInfo);
    const user1 = await users.createUser(userInfo1);
    const user2 = await users.createUser(userInfo2);
    const activity1 = activities.addActivity("Crunch", "Jacobas Douglas", "GOLD", "This is an interesting activity that will keep you fit");
    const activity2 = activities.addActivity("LegCurl", "Henry Jordan", "PLATINUM", "This is another interesting activity that will keep you fit");
    let memberheight = 5
    let memberweight = 50
    let bmi = memberweight/(memberheight*memberheight);
   
    const member1 = await gymMembers.addGymMember("Hilary James", "123 Tower Hill", "hjames@stevens.edu","234567813","3/6/1998","Female","hilarj",memberheight,memberweight,bmi);
    const member2 = await gymMembers.addGymMember("Lois Handza", "245 Lafayette Street", "lhandza@stevens.edu","156789234","7/6/1995","Female","loish",memberheight,memberweight,bmi);
    const trainer1 = await trainer.addTrainer("Jack Henson","crunchcertified","I am a specialist in crunches");
    
    
    
    console.log("Done seeding database");
    await db.serverConfig.close();
};














main();