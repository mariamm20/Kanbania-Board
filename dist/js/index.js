var h1Element = document.getElementById("h1-styling");
var h1Text = h1Element.innerText;  // Use innerText to get the text content, not HTML
var colorsArray = ["#f98ca4", "#65f283", "#f5b10b","#3148a0","#f4eba0", "#c0faca", "#4ad9db", "#722458"];

var styledText = "";

for (var i = 0; i < h1Text.length; i++) {
    if (h1Text[i] !== ' ') {
        styledText += `<span style="color:${colorsArray[i % colorsArray.length]}">${h1Text[i]}</span>`;
    } else {
        styledText += `<br>`;
    }
}

h1Element.innerHTML = styledText;

const timeline = gsap.timeline({ defaults: { duration: .5 } });
timeline

    .from(".first-section", { x: "-400", ease: "none" })
    .from(".second-section", { x: "400", ease: "none" })