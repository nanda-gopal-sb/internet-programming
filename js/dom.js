const button = document.getElementById("button");
const text = document.getElementById("underlined");

const paragraphs = document.querySelectorAll("p");
const formHandeler = document.getElementById("formLAMO");

formHandeler.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
});
button.addEventListener("click", () => {
  text.innerHTML = "underline";
  console.log(paragraphs[0].innerHTML);
}
);