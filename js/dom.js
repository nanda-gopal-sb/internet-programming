
const get = confirm("WIll you be my friend?");



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