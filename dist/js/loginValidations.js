const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginData = {}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  if(validateInputs()){
    var arrayOfUsers = JSON.parse(localStorage.getItem("users"));
  if(arrayOfUsers === null || arrayOfUsers === undefined){
    setError(email,"No  user found")
  }
  else{
    arrayOfUsers.forEach(element => {
      if(element.email === loginData.email && element.password === loginData.password){
        var userData = {};
        window.location.href = 'board.html';
        userData.email = element.email;
        userData.password = element.password;
        userData.name = element.name;
        userData.id = element.id;
        userData.tasks = {
          todo: element.tasks.todo,
          progress: element.tasks.progress,
          done: element.tasks.done
        }
        sessionStorage.setItem("LoggedUserData" , JSON.stringify(userData));
        console.log("Data added successfully");

      }
      else{
        setError(password,"Invalid email or password");
      }
    });
  }
    
  }
});
password.addEventListener('paste', (e) => {
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

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!#%*?&]{8,}$/;
    return re.test(password);
  };

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  let verfied = true;
  if (emailValue === "") {
    setError(email, "Email is required");
    verfied = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please provide a valid email address");
    verfied = false;
  } else {
    setSuccess(email);
    loginData.email =emailValue;
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    verfied = false;
  }  else if (!isValidPassword(passwordValue)) {
    setError(
      password,
      "Invalid Password"
    );
    verfied = false;
  } else {
    setSuccess(password);
    loginData.password =passwordValue;
  }
return verfied;
};



