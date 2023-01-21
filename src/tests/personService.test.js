import {
  personServiceErrors,
  PersonsService,
} from "../services/PersonsService";

const service = new PersonsService();
describe("PersonsService tests", () => {
  /**
   * Tests de la fonction validateAge
   */
  it("should throw error when passing wrong string", () => {
    expect(() => service.validateAge("aaaa")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_INPUT
    );
  });

  it("should throw error when passing string-number", () => {
    expect(() => service.validateAge("aa-22")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_INPUT
    );
  });

  it("should throw error when passing number-string", () => {
    expect(() => service.validateAge("20-aa")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_INPUT
    );
  });

  it("should throw error  when passing number-number and range is not 5", () => {
    expect(() => service.validateAge("20-23")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_RANGE
    );
  });

  it("should throw error when passing number-number and range is not 5", () => {
    expect(() => service.validateAge("20-28")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_RANGE
    );
  });

  it("should throw error when passing number-number and range is 5", () => {
    expect(service.validateAge("30-35")).toBeTruthy();
  });

  it("should throw error when passing start range <20", () => {
    expect(() => service.validateAge("15-20")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_MIN_MAX_AGE
    );
  });

  it("should throw error when passing start range range >40", () => {
    expect(() => service.validateAge("40-45")).toThrow(
      personServiceErrors.QUERY_AGE_INVALID_MIN_MAX_AGE
    );
  });

  /**
   * Tests de la fonction getAgeRangeFromString
   */
  it("should return a valid object", () => {
    expect(service.getAgeRangeFromString("20-25")).toEqual({
      startAgeRange: 20,
      endAgeRange: 25,
    });
  });

  /**
   * Tests de la fonction validateEyeColor
   */

  it("should throw error if eyeColor is not : brown, blue or green", () => {
    expect(() => service.validateEyeColor("test")).toThrow(
      personServiceErrors.QUERY_EYECOLOR_INVALID_VALUE
    );
  });

  it("should work if eyeColor is green", () => {
    expect(service.validateEyeColor("green")).toBeTruthy();
  });

  /**
   * Tests de la fonction filterData
   */

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

  it("should return only persons with eye color equal to blue", () => {
    expect(service.filterData(testData, { eyeColor: "blue" })).toEqual([
      {
        address: "130 Brighton Court, Barrelville, Arkansas, 2523",
        age: 38,
        company: "DELPHIDE",
        email: "henson.jacobson@delphide.org",
        eyeColor: "blue",
        name: { first: "Henson", last: "Jacobson" },
      },
      {
        address: "276 Preston Court, Fairacres, Missouri, 2664",
        age: 35,
        company: "GLOBOIL",
        email: "phyllis.hester@globoil.us",
        eyeColor: "blue",
        name: { first: "Phyllis", last: "Hester" },
      },

      {
        address: "276 Preston Court, Fairacres, Missouri, 2664",
        age: 31,
        company: "GLOBOIL",
        email: "phyllis.hester@globoil.us",
        eyeColor: "blue",
        name: { first: "Kristina", last: "Nelson" },
      },
    ]);
  });

  it("should return only persons that are between 35 and 40", () => {
    expect(service.filterData(testData, { age: "35-40" })).toEqual([
      {
        address: "130 Brighton Court, Barrelville, Arkansas, 2523",
        age: 38,
        company: "DELPHIDE",
        email: "henson.jacobson@delphide.org",
        eyeColor: "blue",
        name: { first: "Henson", last: "Jacobson" },
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
        address: "276 Preston Court, Fairacres, Missouri, 2664",
        age: 35,
        company: "GLOBOIL",
        email: "phyllis.hester@globoil.us",
        eyeColor: "blue",
        name: { first: "Phyllis", last: "Hester" },
      },
    ]);
  });

  it("should return only persons that are between 35 and 40 and have blue eyes", () => {
    expect(
      service.filterData(testData, { age: "35-40", eyeColor: "blue" })
    ).toEqual([
      {
        address: "130 Brighton Court, Barrelville, Arkansas, 2523",
        age: 38,
        company: "DELPHIDE",
        email: "henson.jacobson@delphide.org",
        eyeColor: "blue",
        name: { first: "Henson", last: "Jacobson" },
      },
      {
        address: "276 Preston Court, Fairacres, Missouri, 2664",
        age: 35,
        company: "GLOBOIL",
        email: "phyllis.hester@globoil.us",
        eyeColor: "blue",
        name: { first: "Phyllis", last: "Hester" },
      },
    ]);
  });

  /**
   * Test de la fonction fetch
   */

  it("fetch lunch the fetch call", () => {
    // mock the fetch function
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Hello, world!" }),
      })
    );

    // import your JavaScript code and test it
    service.fetchData({});

    // use the fetchMock.mock property to check the fetch calls
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/datas.json");
  });
});
