
const createUserForm = document.getElementById("createUser-form");

if (createUserForm) {
    $('#dob').change(function () {
        const dob = document.getElementById("dob");
        let dobdate = new Date(dob.value);
        let currentdate = new Date();
       
        if (dobdate > currentdate) {
            $("#error").show();
            $("#error").html("The date of birth can not be later than now !");
        }else{
            $("#error").hide();
        }
    })
    const password = document.getElementById("password");
    const comfirmPassword = document.getElementById("confirmPassword");


    //Add an event listener for the form submit
    createUserForm.addEventListener("submit", event => {
        //We need to prevent the default behavior of the form submit
        //event.preventDefault();


        if (password.value !== comfirmPassword.value) {
            $("#error").show();
            $("#error").html("You Need to supply consistent password!");
            $('#password').focus();
        }else{
            $("#error").hide();
        }
    });
}


const addActivityForm = document.getElementById("add-activity");

if (addActivityForm) {
    $('#startdate').change(function () {
        const startdate = document.getElementById("startdate");
        let startDate = new Date(startdate.value);
        let currentDate = new Date();
       
        if (startDate > currentDate) {
            $("#error").show();
            $("#error").html("The start date can not be later than now !");
        }else{
            $("#error").hide();
        }
    })

    $('#enddate').change(function () {
        const enddate = document.getElementById("enddate");
        let endDate = new Date(enddate.value);
        let currentDate = new Date();
       
        if (endDate < currentDate) {
            $("#error").show();
            $("#error").html("The end date can not be earlier than now !");
        }else{
            $("#error").hide();
        }
    })
}


function checkIsProperType(val, variableName, parameter) { //referred from https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_app_example/calculator.js

    if (typeof val === 'undefined') {
        alert(variableName + "not provided");
    }

    else {

        if (typeof val != variableName) {
            alert(variableName + "is not a" + parameter);

        }
    }
}
function activityFormValidation() {
    let formName = document.getElementById("createActivity-form");

}

