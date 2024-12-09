
const get = window.confirm("WIll you be my friend?");

let text3 = ""; 
if(get){
    text3 = prompt("What is your name?");
}
else{
    text3 = "I am sad";
}
const arr = [1, 2, 3, 4, 5];

for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}


console.log(text3);
const button = document.getElementById("button");
const text = document.getElementById("underlined");

const paragraphs = document.querySelectorAll("p");
const formHandeler = document.getElementById("formLAMO");


const input = formHandeler.querySelectorAll("input");

formHandeler.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  console.log(input[0].value);
  console.log(input[1].value);
});
button.addEventListener("click", () => {
  text.innerHTML = "underline";
  console.log(paragraphs[0].innerHTML);
}
);