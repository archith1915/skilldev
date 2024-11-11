function appendText(){
    let inputText = document.getElementById('inputText').value;
    const valuescontainer = document.getElementById("appendvalues");
    const value = document.createElement("span");
    valuescontainer.appendChild(value);
    value.innerHTML = inputText;
    document.getElementById('inputText').value = "";
    document.getElementById('inputText').focus();
}