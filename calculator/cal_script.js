var num1="", num2="", op="";

function calc(ch){
if (ch>='0' && ch<='9'){
    let box = document.getElementById("box").value;
    box+= ch;
    document.getElementById("box").value = box;
}
else if (ch == '='){
    let num2 = document.getElementById("box").value;
    let expr = num1 + op + num2 ;
    let result = eval(expr);
    num1 ="";
    op="";
    document.getElementById("box").value = result;
}
else if (ch == 'C'){
    num1 = "";
    num2 = "";
    op = "";
    document.getElementById("box").value = "";
}
else{ //for rest of the operations
    num1 = document.getElementById("box").value;
    op = ch;
    document.getElementById("box").value = "";
}
}