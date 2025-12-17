const form = document.getElementById("form");
const output = document.getElementById("output");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let d = parseInt(document.getElementById("day").value);
  let m = parseInt(document.getElementById("month").value) - 1;
  let y = parseInt(document.getElementById("year").value);

  // FIXED validation
  if (isNaN(d) || isNaN(m) || isNaN(y)) {
    error.textContent = "Please fill all fields!";
    return;
  }

  let dob = new Date(y, m, d);
  let today = new Date();

  if (dob > today) {
    error.textContent = "Invalid Date! Enter correct birth date.";
    return;
  }

  error.textContent = "";

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  output.classList.remove("hidden");
  output.innerHTML = `
      <strong>${years}</strong> Years 
      <strong>${months}</strong> Months 
      <strong>${days}</strong> Days
  `;
});
