
const createUserForm = document.getElementById("createUser-form");

if (createUserForm) {

    
    const password = document.getElementById("password");
    const comfirmPassword = document.getElementById("confirmPassword");

    //Add an event listener for the form submit
    createUserForm.addEventListener("submit", event => {
        //We need to prevent the default behavior of the form submit
        event.preventDefault();


        if (password.value !== comfirmPassword.value) {
           
            $("#error").show();
            $("#error").html("You Need to supply consistent password!");

            
            $('#password').focus();
        }
    });
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

