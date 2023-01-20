export class PersonsService {
  data = [];

  /**
   *
   * @param {Object} query Query object to filter the data
   * @param {number} query.age The age of person
   * @param {string} query.eyeColor The eyeColor of person
   */
  async fetchData(query) {
    this.validateQuery(query);
    const fetchedData = await (await fetch("http://localhost:8080/datas.json")).json();
    this.data = fetchedData;
    return this.filterData(query);
  }

  /**
   * throws the
   * @param {query} query
   */
  validateQuery(query) {
    if ("age" in query) {
      this.validateAge(query.age);
    }
    if ("eyeColor" in query) {
      this.validateEyeColor(query.eyeColor);
    }
  }

  validateAge(age) {
    const { startAgeRange, endAgeRange } = this.getAgeRangeFromString(age);
    if (isNaN(startAgeRange) || isNaN(endAgeRange)) {
      throw new Error("QUERY_AGE_INVALID_INPUT");
    }
    if (endAgeRange - startAgeRange !== 5) {
      throw new Error("QUERY_AGE_INVALID_RANGE");
    }
  }

  validateEyeColor(eyeColor) {
    const validColors = ["brown", "blue", "green"];
    if (!validColors.includes(eyeColor)) {
      throw new Error("QUERY_EYECOLOR_INVALID_VALUE");
    }
  }

  getAgeRangeFromString(age) {
    const [startAgeRange, endAgeRange] = (age || "").split("-").map((i) => parseInt(i));
    return { startAgeRange, endAgeRange };
  }
  /**
   * @param {query} query
   */

  filterData(query) {
    const shouldFilterByAge = "age" in query;
    const shouldFilterByEyeColor = "eyeColor" in query;

    if (!shouldFilterByAge && !shouldFilterByEyeColor) {
      return this.data;
    }

    const { startAgeRange, endAgeRange } = this.getAgeRangeFromString(query.age);
    return this.data.filter((el) => {
      if (shouldFilterByAge && shouldFilterByEyeColor) {
        return el.eyeColor === query.eyeColor && el.age <= endAgeRange && el.age >= startAgeRange;
      }
      if (shouldFilterByAge && !shouldFilterByEyeColor) {
        return el.age <= endAgeRange && el.age >= startAgeRange;
      }
      if (!shouldFilterByAge && shouldFilterByEyeColor) {
        return el.eyeColor === query.eyeColor;
      }
    });
  }
}
