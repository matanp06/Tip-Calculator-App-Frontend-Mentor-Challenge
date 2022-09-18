// setting the inputs
const billInput = document.getElementById("input-bill");
const tipPercentageOptions = document.getElementsByClassName("precentage");
const customTipInput = document.querySelector(".precentage.custom");
const numberOfPeopleInput = document.getElementById("input-people");

// setting the outputs
const tipOutput = document.getElementById("Tip-Amount");
const totalOutput = document.getElementById("Total");

// the reset button 
const resetButton = document.querySelector("#output-section button");

//Setting variables
let bill = 0;
let percentage = 5;
let numberOfPeople = 0;

//makes sure that all the fields are in there default 
//states after a refresh
window.onload = reset

//User changes the bill value
billInput.addEventListener("input",function(e){

    // invalid char was inserted
    // e.data == null means backspaces
    if(billInput.value == "" && e.data != null){
        billInput.value = bill.toString();
        return
    } else if(e.data == "."){
        bill = bill+".";
        return;
    } else if(billInput.value<0){
        billInput.value = 0;
    }
    bill = billInput.value
    calculateTip(bill,percentage,numberOfPeople);
    calculateTotalAmount(bill,percentage,numberOfPeople);

    enableResetButton();

    
});

//User changes the percentage
for(let i = 0; i<tipPercentageOptions.length; i++){
    tipPercentageOptions[i].addEventListener("click",function(e){

        //finding the old selected option and unselect it
        const oldSelected = document.querySelector(".precentage.selected")
        oldSelected.classList.remove("selected");

        //selecting the new option
        const newOption = e.target;
        newOption.classList.add("selected");

        //setting the new percentage
        //in case the custom option is selected and it's invalid value
        if(isNaN(newOption.value)){ 
            percentage = 0;
            calculateTip(bill,percentage,numberOfPeople);
            calculateTotalAmount(bill,percentage,numberOfPeople);
        } else {
            percentage = newOption.value;
            calculateTip(bill,percentage,numberOfPeople);
            calculateTotalAmount(bill,percentage,numberOfPeople);
        }

        enableResetButton();

    })
}

//User changes the custom tip
customTipInput.addEventListener("input",function(e){

    // invalid char was inserted
    // e.data == null means backspace pressed
    if(customTipInput.value == "" && e.data != null){   
        customTipInput.value = percentage.toString();
        return
    } else if(e.data == "."){
        percentage = percentage+".";
        return;
    } else if(customTipInput.value <0){
        customTipInput.value = 0;
    }
    percentage = customTipInput.value;
    calculateTip(bill,percentage,numberOfPeople);
    calculateTotalAmount(bill,percentage,numberOfPeople);

    enableResetButton();

});

//User changes the amount of people
numberOfPeopleInput.addEventListener("input",function(e){

    // invalid char was inserted
    if(numberOfPeopleInput.value == ""){
        // backspace pressed
        if(e.data == null){
            numberOfPeople = 0;
            numberOfPeopleInput.value = "";
            alertPeopleInvalid();
            return
        }else{
            numberOfPeopleInput.value = numberOfPeople.toString();
            return
        }
    } else if(numberOfPeopleInput.value<0){

        numberOfPeopleInput.value = 0;

    }

    //prevent non integer number of people
    numberOfPeople = Math.round(numberOfPeopleInput.value)

    //alert the user if the number of people inserted is 0
    if(numberOfPeople == 0){
        alertPeopleInvalid();
    } else {
        removeAlertPeopleInvalid();
    }

    numberOfPeopleInput.value = numberOfPeople.toString();
    calculateTip(bill,percentage,numberOfPeople);
    calculateTotalAmount(bill,percentage,numberOfPeople);

    enableResetButton();


});

// Making allerting the user when the number of people is set to 0
numberOfPeopleInput.addEventListener("blur",function(){
    if(numberOfPeopleInput.value == 0){
        alertPeopleInvalid();
    }
});


//calculating the tip (per person) and setting the tip output 
//accordingly
function calculateTip(bill, percentage, people){

    
    bill = Number(bill)
    percentage = Number(percentage)
    people = Number(people);

    //not deviding by zero or by negative number
    if(people<=0)
        return
    let tip = (bill*percentage/100)/people;
    // rounding the result
    tip = Math.round(tip*100)/100;
    console.log(tip)
    tipOutput.innerHTML = "$"+tip.toString();

}

//calculating the total amount (per person) of the bill and setting the 
//total amount output accordingly
function calculateTotalAmount(bill,percentage,people){
    bill = Number(bill)
    percentage = Number(percentage)
    people = Number(people)

    //not deviding by zero or by negative number
    if(people<=0)
        return
    let total = (bill+bill*percentage/100)/people;
    //rounding the result
    total = Math.round(total*100)/100;
    totalOutput.innerHTML = "$"+total.toString();

}

//enabling reset button
function enableResetButton(){
    if(resetButton.disabled){

        resetButton.disabled = false;

    }
}

// reset button pressed
resetButton.addEventListener("click",reset);

// reset all the states to the default
function reset(){

    billInput.value = ""
    bill = 0;
    
    document.querySelector(".precentage.selected").classList.remove("selected");
    tipPercentageOptions[0].classList.add("selected");
    customTipInput.value = "";
    percentage = 5;

    numberOfPeopleInput.value="";
    numberOfPeople = 0;
    removeAlertPeopleInvalid();

    tipOutput.innerHTML ="$0.00";
    totalOutput.innerHTML ="$0.00";

    resetButton.disabled = true;    

}

//alerts the user using the UI that the number of people
//that inserted is invalid
function alertPeopleInvalid(){

    numberOfPeopleInput.parentElement.parentElement.classList.add("invalid");    

}

//removes the alert of the invalid number of inserted people
function removeAlertPeopleInvalid(){

    numberOfPeopleInput.parentElement.parentElement.classList.remove("invalid");    

}


