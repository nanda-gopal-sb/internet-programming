// The DOM is the central programming API for the JS language to traverse the HTML tree. 
// The DOM represents the document as nodes and objects; that way, programming languages can interact with the page. 
//The DOM is not part of the JavaScript language, but is instead a Web API used to build websites.



const button = document.getElementById("button");
const text = document.getElementById("underlined");


const paragraphs = document.querySelectorAll("p");



button.addEventListener("click", () => {
  text.innerHTML = "underline";
  console.log(paragraphs[0].innerHTML);
}
);