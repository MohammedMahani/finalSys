const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

const dataTable = document.querySelector(".data-table");
const noData = document.getElementById("no-data");
const tableBody = document.getElementById("table-body");

// -------------------------------------

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");

// -------------------------------------
const uploadInput = document.getElementById("upload-input");
const uploadBtn = document.getElementById("upload-btn");

function searchFun() {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tableBody.innerHTML = "";

    if (!searchInput.value) {
      noData.style.display = "block";
      dataTable.style.display = "none";
    } else {
      fetch(`api/v1/search?query=${searchInput.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((entry) => {
            dataTable.style.display = "block";
            noData.style.display = "none";
            const row = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = entry.name;
            row.appendChild(firstNameCell);

            const lastNameCell = document.createElement("td");
            lastNameCell.textContent = entry.last_name;
            row.appendChild(lastNameCell);

            const genderCell = document.createElement("td");
            genderCell.textContent = entry.gender;
            row.appendChild(genderCell);

            const ageCell = document.createElement("td");
            ageCell.textContent = entry.age;
            row.appendChild(ageCell);

            const passportCell = document.createElement("td");
            passportCell.textContent = entry.passport;
            row.appendChild(passportCell);

            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = entry.phone_number;
            row.appendChild(phoneNumberCell);

            const addressCell = document.createElement("td");
            addressCell.textContent = entry.address;
            row.appendChild(addressCell);

            const benefitCell = document.createElement("td");
            benefitCell.textContent = entry.status;
            row.appendChild(benefitCell);

            tableBody.appendChild(row);
          });
        });
    }
  });
}

function loginFun() {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/";
      });
  });
}

// const formData = new FormData();
// formData.append("file", uploadInput.files[0]);

// console.log(formData,'sssssssssssss');


uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hii");
  fetch("/api/v1/upload-data", {
    method: "POST",
    body: uploadInput.value,
  }).then((res) => res.json());
  // .then(() => {
  //   window.location.href = "/";
  // });
});
