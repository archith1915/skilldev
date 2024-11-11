function calculateSecondMax() {
    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
    const num3 = parseInt(document.getElementById("num3").value);

    const secondMax = findSecondMax(num1, num2, num3);
    document.getElementById("operation").textContent =
      "The second maximum number is: ";
      document.getElementById("result_val").textContent = secondMax;
  }

  function findSecondMax(num1, num2, num3) {
    let max = num1;
    let secondMax = num2;

    if (num2 > num1) {
      max = num2;
      secondMax = num1;
    }

    if (num3 > max) {
      secondMax = max;
      max = num3;
    } else if (num3 > secondMax) {
      secondMax = num3;
    }

    return secondMax;
  }