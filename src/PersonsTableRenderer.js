export class PersonsTableRenderer {
  #tableId = "tableContainer";
  #columns = [
    { label: "Nom", columnName: "name.last" },
    { label: "Prénom", columnName: "name.first" },
    { label: "Âge", columnName: "age" },
    { label: "Couleur des yeux", columnName: "eyeColor" },
    { label: "email", columnName: "email" },
    { label: "Entreprise", columnName: "company" },
    { label: "Addresse", columnName: "address" },
  ];

  getTableHtml(data) {
    const builtHtml = `
    <table>
      <thead>
        ${this.#columns.map((column) => `<th>${column.label}</th>`).join("\n")}
      </thead>
      <tbody>
      ${data
        .map(
          (person) => `
          <tr>
            ${this.#columns.map((col) => `<td>${this.resolveFieldValue(col.columnName, person)}</td>`).join("\n")}
          </tr>`
        )
        .join("\n")}
      </tbody>
    </table>
    `;
    return builtHtml;
  }

  /**
   *
   * @param {*} path
   * @param {*} obj
   * @param {*} separator
   * @returns
   */
  resolveFieldValue(path, obj, separator = ".") {
    const properties = path.split(separator);
    return properties.reduce((prev, curr) => prev?.[curr], obj);
  }

  render(data) {
    document.getElementById(this.#tableId).innerHTML = this.getTableHtml(data);
  }
}
