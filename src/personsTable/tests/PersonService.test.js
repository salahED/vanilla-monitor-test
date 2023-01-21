jest.mock("../../httpClient");
import { httpClient } from "../../httpClient";
import { personServiceErrors, PersonsService } from "../PersonsService";
const service = new PersonsService();

describe("validateAge test", () => {
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
});

describe("getAgeRangeFromString test", () => {
  it("should return a valid object", () => {
    expect(service.getAgeRangeFromString("20-25")).toEqual({
      startAgeRange: 20,
      endAgeRange: 25,
    });
  });
});

describe("validateEyeColor tests", () => {
  it("should throw error if eyeColor is not : brown, blue or green", () => {
    expect(() => service.validateEyeColor("test")).toThrow(
      personServiceErrors.QUERY_EYECOLOR_INVALID_VALUE
    );
  });

  it("should work if eyeColor is green", () => {
    expect(service.validateEyeColor("green")).toBeTruthy();
  });
});

describe("filterData tests", () => {
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
    const peopleWithBlueEyeColor = [
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
    ];
    expect(service.filterData(testData, { eyeColor: "blue" })).toEqual(
      peopleWithBlueEyeColor
    );
  });

  it("should return only persons that are between 35 and 40", () => {
    const peopleThatAreBetween35and40 = [
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
    ];
    expect(service.filterData(testData, { age: "35-40" })).toEqual(
      peopleThatAreBetween35and40
    );
  });

  it("should return only persons that are between 35 and 40 and have blue eyes", () => {
    const peopleWithBlueEyeAndAge35to40 = [
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
    ];
    expect(
      service.filterData(testData, { age: "35-40", eyeColor: "blue" })
    ).toEqual(peopleWithBlueEyeAndAge35to40);
  });
});

describe("fetchData tests", () => {
  it("should call the fetch with the right path", async () => {
    const getSpy = jest.spyOn(httpClient, "get");
    await service.fetchData({});
    expect(getSpy).toHaveBeenCalledWith("/datas.json");
  });
});
