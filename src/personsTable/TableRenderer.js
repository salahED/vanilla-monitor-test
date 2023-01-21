export class TableRenderer {
  /**
   *  l'id html de la table
   */
  tableId = "tableContainer";

  /**
   * columnName : le nom de la colonne dans notre fichier datas
   * label : le nom de la colonne dans la table html
   */
  columns = [
    { label: "Nom", columnName: "name.last" },
    { label: "Prénom", columnName: "name.first" },
    { label: "Âge", columnName: "age" },
    { label: "Couleur des yeux", columnName: "eyeColor" },
    { label: "email", columnName: "email" },
    { label: "Entreprise", columnName: "company" },
    { label: "Addresse", columnName: "address" },
  ];

  /**
   *
   * @param {TableData} data les données des personnes à afficher
   * @returns {string} string html qui contient l'html du tableau
   */
  getTableHtml(data) {
    const builtHtml = `
    <table>
      <thead>
        ${this.columns.map((column) => `<th>${column.label}</th>`).join("\n")}
      </thead>
      <tbody>
      ${data
        .map(
          (person) => `
          <tr>
            ${this.columns
              .map(
                (col) =>
                  `<td>${this.resolveFieldValue(col.columnName, person)}</td>`
              )
              .join("\n")}
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
   * @param {string} path
   * @param {PersonDataObject} obj
   * @param {string} separator
   * @returns                       retourn un string
   *
   * @example
   * const userObj = {
   *  user: {
   *   name: "salah",
   *  },
   * };
   * // x userObj[user.name] x
   * const name = this.resolveFieldValue("user.name", userObj, ".");
   * console.log(name); //salah
   */

  resolveFieldValue(path, obj, separator = ".") {
    const properties = path.split(separator);
    return properties.reduce((prev, curr) => prev?.[curr], obj);
  }
  /**
   *
   * @param {*} data La donnée qui va être afficher
   */
  render(data) {
    document.getElementById(this.tableId).innerHTML = this.getTableHtml(data);
  }
}
