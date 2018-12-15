function checkIsProperType(val, variableName,parameter) { //referred from https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_app_example/calculator.js
        
    if(typeof val === 'undefined'){
        alert(variableName+"not provided");
    }
   
    else{    
       
        if (typeof val != variableName) {
            alert(variableName+ "is not a"+parameter ) ;
            
         }
        }
}
function activityFormValidation(){
    let formName=document.getElementById("createActivity-form");

}