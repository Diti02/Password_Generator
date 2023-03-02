const inputslider= document.querySelector("[data-lengthSlider]");
let lengthDisplay= document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password ="";
let checkcount=0;


let passwordLength =10;
//set password length
function handleSlider(){
    inputslider.value=passwordLength;
     lengthDisplay.innerText=passwordLength;
 }

 handleSlider(); //set default value as 10

inputslider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handleSlider();
})



function setIndicator(color){
    indicator.style.backgroundColor=color;
}

function getRndInt(min,max){
     return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRndInt(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInt(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInt(65,91));
}

function generateSymbol(){
    const randNum=getRndInt(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    if(uppercaseCheck.checked && lowercaseCheck.checked && (numbersCheck.checked || symbolsCheck.checked) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((lowercaseCheck.checked || uppercaseCheck.checked) && (numbersCheck.checked || symbolsCheck.checked) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

copyBtn.addEventListener('click' ,()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click', ()=>{ 

})

function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkcount++;
    }); 
    //special case
     if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleSlider();
     }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generateBtn.addEventListener('click', ()=>{
    if(checkcount<=0)
    return;

    if(passwordLength< checkcount){
        passwordLength=checkcount;
        handleSlider();
    }

    password="";
    // if(uppercaseCheck.checked){
    //     password+= generateUpperCase();
    // } 
    // if(lowerCheck.checked){
    //     password+= generateLowerCase();
    // } 
    // if( numbersCheck.checked){
    //     password+= generateRandomNumber();
    // } 
    // if(symbolsCheck.checked){
    //     password+= generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

        for(let i=0; i<funcArr.length; i++) {
            password += funcArr[i]();
           
        }
      
        for(let i=0; i<passwordLength-funcArr.length; i++) {
            let randIndex = getRndInt(0 , funcArr.length);
            console.log("randIndex" + randIndex);
            password += funcArr[randIndex]();
        }
        
        password = shufflePassword(Array.from(password));
        function shufflePassword(array) {
            //Fisher Yates Method
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }
            let str = "";
            array.forEach((el) => (str += el));
            return str;
        }
        passwordDisplay.value = password;
        calcStrength();

});