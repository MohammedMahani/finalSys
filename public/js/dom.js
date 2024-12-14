const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

const dataTable = document.querySelector(".data-table");
const noData = document.getElementById("no-data");
const tableBody = document.getElementById("table-body");
const secTableBody = document.getElementById("sec-table-body");

// -------------------------------------

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");

// -------------------------------------
const uploadInput = document.getElementById("upload-input");
const importForm = document.getElementById("importForm");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  secTableBody.innerHTML = "";

  if (!searchInput.value || searchInput.value.length < 6) {
    noData.style.display = "block";
    dataTable.style.display = "none";
  } else {
    fetch(`api/v1/search?query=${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueEntries = new Map();

        data.forEach((entry) => {
          if (!uniqueEntries.has(entry.passport)) {
            // إذا لم يتم إضافة هذا الشخص بعد
            uniqueEntries.set(entry.passport, {
              personalInfo: {
                first_name: entry.first_name,
                second_name: entry.second_name,
                third_name: entry.third_name,
                last_name: entry.last_name,
                gender: entry.gender,
                age: entry.age,
                passport: entry.passport,
                phone_number: entry.phone_number,
                address: entry.address,
              },
              statuses: [],
            });
          }
          // أضف الحالة (status) الخاصة بهذا الشخص
          uniqueEntries.get(entry.passport).statuses.push({
            org_name: entry.org_name,
            rent: entry.rent,
            furniture: entry.furniture,
            clothes: entry.clothes,
            medical: entry.medical,
            pocket_money: entry.pocket_money,
            other: entry.other,
          });
        });

        uniqueEntries.forEach(({ personalInfo, statuses }) => {
          // إنشاء صف للبيانات الشخصية
          const row = document.createElement("tr");

          Object.values(personalInfo).forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
          });

          tableBody.appendChild(row);
          console.log(statuses, "ppppppppppppppp");

          // إنشاء صفوف لحالات الشخص
          statuses.forEach(
            ({
              org_name,
              rent,
              furniture,
              clothes,
              medical,
              pocket_money,
              other,
            }) => {
              const secRow = document.createElement("tr");

              if (!rent) {
                const rentCell = document.createElement("td");
                rentCell.textContent = "nothing";
                secRow.appendChild(rentCell);
              } else {
                const rentCell = document.createElement("td");
                rentCell.textContent = org_name;
                secRow.appendChild(rentCell);
              }
              if (!furniture) {
                const furnitureCell = document.createElement("td");
                furnitureCell.textContent = "nothing";
                secRow.appendChild(furnitureCell);
              } else {
                const furnitureCell = document.createElement("td");
                furnitureCell.textContent = org_name;
                secRow.appendChild(furnitureCell);
              }

              if (!clothes) {
                const clothesCell = document.createElement("td");
                clothesCell.textContent = "Nothing";
                secRow.appendChild(clothesCell);
              } else {
                const clothesCell = document.createElement("td");
                clothesCell.textContent = org_name;
                secRow.appendChild(clothesCell);
              }

              if (!medical) {
                const medicalCell = document.createElement("td");
                medicalCell.textContent = "Nothing";
                secRow.appendChild(medicalCell);
              } else {
                const medicalCell = document.createElement("td");
                medicalCell.textContent = org_name;
                secRow.appendChild(medicalCell);
              }

              if (!pocket_money) {
                const pocketMoneyCell = document.createElement("td");
                pocketMoneyCell.textContent = "Nothing";
                secRow.appendChild(pocketMoneyCell);
              } else {
                const pocketMoneyCell = document.createElement("td");
                pocketMoneyCell.textContent = org_name;
                secRow.appendChild(pocketMoneyCell);
              }

              if (!other) {
                const otherCell = document.createElement("td");
                otherCell.textContent = "Nothing";
                secRow.appendChild(otherCell);
              } else {
                const otherCell = document.createElement("td");
                otherCell.textContent = org_name;
                secRow.appendChild(otherCell);
              }

              secTableBody.appendChild(secRow);
            }
          );
        });

        dataTable.style.display = "block";
        noData.style.display = "none";
      });
  }
});

function init() {
  document
    .getElementById("fileInput")
    .addEventListener("change", handleFileSelect, false);
}

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  console.log(event);
  console.log(event.target.result);
  const dataResult = event.target.result;

  fetch("/api/v1/upload-data", {
    method: "POST",
    body: dataResult,
  }).then((res) => res.json());
}

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   tableBody.innerHTML = "";
//   secTableBody.innerHTML = "";

//   if (!searchInput.value) {
//     noData.style.display = "block";
//     dataTable.style.display = "none";
//   } else {
//     fetch(`api/v1/search?query=${searchInput.value}`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Map to store unique entries with combined statuses
//         const uniqueEntries = new Map();

//         data.forEach((entry) => {
//           const key = `${entry.name}-${entry.last_name}-${entry.passport}`; // Unique identifier

//           if (!uniqueEntries.has(key)) {
//             uniqueEntries.set(key, {
//               ...entry,
//               statuses: [entry.status], // Initialize statuses as an array
//             });
//           } else {
//             // Add the new status to the existing array
//             uniqueEntries.get(key).statuses.push(entry.status);
//           }
//         });

//         uniqueEntries.forEach((entry) => {
//           dataTable.style.display = "block";
//           noData.style.display = "none";

//           const row = document.createElement("tr");
//           const secRow = document.createElement("tr");

//           const firstNameCell = document.createElement("td");
//           firstNameCell.textContent = entry.name;
//           row.appendChild(firstNameCell);

//           const lastNameCell = document.createElement("td");
//           lastNameCell.textContent = entry.last_name;
//           row.appendChild(lastNameCell);

//           const genderCell = document.createElement("td");
//           genderCell.textContent = entry.gender;
//           row.appendChild(genderCell);

//           const ageCell = document.createElement("td");
//           ageCell.textContent = entry.age;
//           row.appendChild(ageCell);

//           const passportCell = document.createElement("td");
//           passportCell.textContent = entry.passport;
//           row.appendChild(passportCell);

//           const phoneNumberCell = document.createElement("td");
//           phoneNumberCell.textContent = entry.phone_number;
//           row.appendChild(phoneNumberCell);

//           const addressCell = document.createElement("td");
//           addressCell.textContent = entry.address;
//           row.appendChild(addressCell);

//           const statusCell = document.createElement("td");
//           // Join all statuses with a comma
//           statusCell.textContent = entry.statuses.join(", ");

//           secRow.appendChild(statusCell);

//           const orgNameCell = document.createElement("td");
//           orgNameCell.textContent = entry.org_name;
//           secRow.appendChild(orgNameCell);

//           secTableBody.appendChild(secRow);

//           tableBody.appendChild(row);
//         });
//       });
//   }
// });
