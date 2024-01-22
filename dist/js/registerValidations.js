const form = document.getElementById("form");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const input = document.querySelector('#password2');
const user= {};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  if(validateInputs()){
    setDataInLocalStorage(user);
    window.location.href = 'login.html';
  }
});
input.addEventListener('paste', (e) => {
    e.preventDefault(); 
  });

const setError = (element, message) => {
  
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerHTML = "<i class='bx bxs-error-alt'></i> " + message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const setDataInLocalStorage = (element)=>{
  var arrayOfUsers = JSON.parse(localStorage.getItem("users"));
  if(arrayOfUsers === null || arrayOfUsers === undefined){
    arrayOfUsers = [];
  }
  element.tasks = {
    todo: [],
    progress: [],
    done:[]
  }
  arrayOfUsers.push(element);
  localStorage.setItem("users" , JSON.stringify(arrayOfUsers));

}

const isValidName = (txt) => {
  const re = /^[a-zA-Z ]+$/
  return re.test(txt);
}

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!#%*?&]{8,}$/;
    return re.test(password);
  };

  const validateIDNumber = (idnum) => {
    const re = /^\d{16}$/;
    return re.test(idnum);
  };
  

const validateInputs = () => {
  const id =Math.floor(Math.random() * 100) + 1;;
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  let verfied = true;
  if (userNameValue === "") {
    setError(userName, "Name is required");
    verfied = 0;
  } else if (!isValidName(userNameValue)) {
    setError(userName, "Please provide a valid name");
    verfied = false;
  } else {
    setSuccess(userName);
    user.id = id;
    user.name = userNameValue; 
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    verfied = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please provide a valid email address");
    verfied = false;
  } else {
    setSuccess(email);
    user.email = emailValue;
  }



  if (passwordValue === "") {
    setError(password, "Password is required");
    verfied = false;
  }  else if (!isValidPassword(passwordValue)) {
    setError(
      password,
      "Password must at contain least at eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
    verfied = false;
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
    verfied = false;
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords don't match");
    verfied = false;
  } else {
    setSuccess(password2);
    user.password = password2Value;
    
  }
  return verfied;
};
