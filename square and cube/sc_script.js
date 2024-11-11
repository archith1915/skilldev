function cal_square()
{
    let inputnum = document.getElementById('inputnum').value;
    let result = inputnum*inputnum;
    document.getElementById('result_val').innerHTML = result;
    document.getElementById('operation').innerHTML = "The square of the given number is: ";
    document.getElementById('inputnum').focus();
}

function cal_cube()
{
    let inputnum = document.getElementById('inputnum').value;
    let result = inputnum*inputnum*inputnum;
    document.getElementById('result_val').innerHTML = result;
    document.getElementById('operation').innerHTML = "The cube of the given number is: ";
    document.getElementById('inputnum').focus();
}