import { TableRenderer } from "../TableRenderer";

const personsTableRenderer = new TableRenderer();

describe("test", () => {
  const testData = [
    {
      age: 38,
      eyeColor: "blue",
      name: {
        first: "Henson",
        last: "Jacobson",
      },
      company: "DELPHIDE",
      email: "henson.jacobson@delphide.org",
      address: "130 Brighton Court, Barrelville, Arkansas, 2523",
    },
    {
      age: 37,
      eyeColor: "brown",
      name: {
        first: "Naomi",
        last: "Puckett",
      },
      company: "ROUGHIES",
      email: "naomi.puckett@roughies.name",
      address: "973 Cleveland Street, Bend, Alabama, 147",
    },
    {
      age: 35,
      eyeColor: "blue",
      name: {
        first: "Phyllis",
        last: "Hester",
      },
      company: "GLOBOIL",
      email: "phyllis.hester@globoil.us",

      address: "276 Preston Court, Fairacres, Missouri, 2664",
    },
    {
      age: 31,
      eyeColor: "blue",
      name: {
        first: "Kristina",
        last: "Nelson",
      },
      company: "GLOBOIL",
      email: "phyllis.hester@globoil.us",

      address: "276 Preston Court, Fairacres, Missouri, 2664",
    },
  ];
  it("should build html correctly", () => {
    const expectedTableHtml = `
    <table>
      <thead>
        <th>Nom</th>
<th>Prénom</th>
<th>Âge</th>
<th>Couleur des yeux</th>
<th>email</th>
<th>Entreprise</th>
<th>Addresse</th>
      </thead>
      <tbody>
      
          <tr>
            <td>Jacobson</td>
<td>Henson</td>
<td>38</td>
<td>blue</td>
<td>henson.jacobson@delphide.org</td>
<td>DELPHIDE</td>
<td>130 Brighton Court, Barrelville, Arkansas, 2523</td>
          </tr>

          <tr>
            <td>Puckett</td>
<td>Naomi</td>
<td>37</td>
<td>brown</td>
<td>naomi.puckett@roughies.name</td>
<td>ROUGHIES</td>
<td>973 Cleveland Street, Bend, Alabama, 147</td>
          </tr>

          <tr>
            <td>Hester</td>
<td>Phyllis</td>
<td>35</td>
<td>blue</td>
<td>phyllis.hester@globoil.us</td>
<td>GLOBOIL</td>
<td>276 Preston Court, Fairacres, Missouri, 2664</td>
          </tr>

          <tr>
            <td>Nelson</td>
<td>Kristina</td>
<td>31</td>
<td>blue</td>
<td>phyllis.hester@globoil.us</td>
<td>GLOBOIL</td>
<td>276 Preston Court, Fairacres, Missouri, 2664</td>
          </tr>
      </tbody>
    </table>
    `;
    expect(personsTableRenderer.getTableHtml(testData)).toEqual(
      expectedTableHtml
    );
  });

  it("should return the lastname", () => {
    expect(
      personsTableRenderer.resolveFieldValue("name.first", testData[0])
    ).toBe("Henson");
  });

  it("should return the name object", () => {
    expect(personsTableRenderer.resolveFieldValue("name", testData[0])).toEqual(
      {
        first: "Henson",
        last: "Jacobson",
      }
    );
  });

  it("should return undefined", () => {
    expect(personsTableRenderer.resolveFieldValue("", testData[0])).toEqual(
      undefined
    );
  });
});
