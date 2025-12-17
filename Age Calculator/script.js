console.log("Age Calculator Loaded");

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const btn = document.getElementById("calcBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

// auto format inputs
function formatInput(input, len){
  input.addEventListener("input",()=>{
    if(input.value.length > len){
      input.value = input.value.slice(0,len);
    }
  });
}
formatInput(day,2);
formatInput(month,2);
formatInput(year,4);

// reusable validator
function validate(){
  if(!day.value || !month.value || !year.value){
    return "Please fill all fields!";
  }
  if(month.value < 1 || month.value > 12){
    return "Month must be 1-12";
  }
  if(day.value < 1 || day.value > 31){
    return "Day must be 1-31";
  }
  let d = new Date(year.value, month.value-1, day.value);
  let now = new Date();

  if(d > now){
    return "Future date not allowed";
  }
  return null;
}

// reusable utility: calculate difference
function calculateAge(){
  let birth = new Date(year.value, month.value - 1, day.value);
  let now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if(days < 0){
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if(months < 0){
    years--;
    months += 12;
  }

  return {years,months,days};
}

// highlight result animation
function animate(){
  result.style.opacity = "0";
  setTimeout(()=>{
    result.style.opacity="1";
  },200);
}

// handle btn click
btn.addEventListener("click",()=>{

  console.time("calculation");
  
  const msg = validate();
  if(msg){
    result.textContent="";
    error.textContent = msg;
    return;
  }

  error.textContent="";

  const age = calculateAge();
  result.textContent = 
      `You are ${age.years} Years, ${age.months} Months, ${age.days} Days`;

  animate();
  console.timeEnd("calculation");
});

// debugging helpers
function debugInputs(){
  console.table({
    day:day.value,
    month:month.value,
    year:year.value
  });
}

// auto log inputs every 5 sec
setInterval(()=>{
  debugInputs();
},5000);

// keyboard support
document.addEventListener("keyup",(e)=>{
  if(e.key === "Enter"){
    btn.click();
  }
});

// clear result on input change
[day,month,year].forEach(el=>{
  el.addEventListener("input",()=>{
    result.textContent="";
    error.textContent="";
  });
});
