const renderTable = (data, columns) => {
  let table = "<tr>";
  columns.forEach((column) => {
    table += `<th>${column.key}</th>`;
  });
  table += `<div id="hover-div"> +
  <div id="dropdown-list">
    <ul>`;

  columns.forEach((column) => {
    table += `<input type="checkbox" value=${column.key} ${
      column.checked ? "checked" : null
    } onclick="${handleCheckbox()}"> <label for="music">${column.key}</label>`;
  });

  table += ` </ul>
  </div>
</div>`;
  table += "</tr>";

  data.forEach((person) => {
    table += `<tr>
          <td>${person.lastName}</td>
          <td>${person.firstName}</td>
          <td>${person.age}</td>
          <td>${person.eyeColor}</td>
          <td>${person.email}</td>
      </tr>`;
  });

  return table;
};

const handleCheckbox = () => {};

let columns = [
  { key: "Nom", checked: true },
  { key: "Prénom", checked: true },
  { key: "Âge", checked: true },
  { key: "Couleur des yeux", checked: true },
  { key: "email", checked: true },
  { key: "Entreprise", checked: true },
  { key: "isActive", checked: true },
];
const dataset = [
  {
    lastName: "Doe",
    firstName: "John",
    age: 25,
    eyeColor: "brown",
    email: "john.doe@gmail.com",
  },
  {
    lastName: "Smith",
    firstName: "Jane",
    age: 32,
    eyeColor: "blue",
    email: "jane.smith@gmail.com",
  },
  // more data here
];
export const main = () => {
  //Nom, Prénom, Âge, Couleur des yeux et email.

  const table = renderTable(dataset, columns);
  document.getElementById("dataTable").innerHTML = table;
};

// import "./styles.css";
// export const fetchCall = async () => {
//   const res = await fetch("http://localhost:8080/datas.json");
//   const jsonRes = await res.json();
//   const filter = jsonRes.filter((data) => data.age > 31);
//   console.log("datas", filter);
//   let [a, , b] = filter;
//   console.log("first and last ", a, b);
// };
