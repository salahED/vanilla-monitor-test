export class PersonsService {
  /**
   *
   * @param {Object} query L'objet query qui permet de filtrer la requete
   * @param {number} query.age L'intervalle d'age de la personne
   * @param {string} query.eyeColor La couleur des yeux
   */
  async fetchData(query) {
    /**
     * validateQuery permet de valider la requete avant de lancer le filtre
     * permettre de ne pas ecrire n'importe quoi dans l'URL
     */
    this.validateQuery(query);

    const fetchedData = await (
      await fetch("http://localhost:8080/datas.json")
    ).json();

    /**
     * filterData permet de filtrer la donnée soit par tranche d'age, couleur
     * des yeux ou les deux
     */
    return this.filterData(fetchedData, query);
  }

  /**
   *
   * @param {query} query L'objet de la requete {age, eyeColor}
   */
  validateQuery(query) {
    /**
     * Verifier si l'age ou la couleur des yeux sont dans la requete,
     * puis lancer les validator pour verifier que ce sont ecrites
     * avec le bon format
     */
    if ("age" in query) {
      this.validateAge(query.age);
    }
    if ("eyeColor" in query) {
      this.validateEyeColor(query.eyeColor);
    }
  }

  /**
   *
   * @param {*} age La tranche d'age xx-xx
   * @returns       Si la tranche d'age est de bon format alors return TRUE
   *                Sinon la fonction THROW une erreur
   */
  validateAge(age) {
    /**
     * getAgeRangeFromString permet de recupirer les valuer en entrer de
     * la tranche d'age, ex: "20-25" => { startAgeRange:20, endAgeRange:25 }
     */
    const { startAgeRange, endAgeRange } = this.getAgeRangeFromString(age);

    /**
     * Verifier que startAgeRange et endAgeRange sont de type number si non
     * THROW error
     */
    if (isNaN(startAgeRange) || isNaN(endAgeRange)) {
      throw new Error(personServiceErrors.QUERY_AGE_INVALID_INPUT);
    }

    /**
     * Verifier que l'intervalle d'age est de 5 ans si non THROW error
     */
    if (endAgeRange - startAgeRange !== 5) {
      throw new Error(personServiceErrors.QUERY_AGE_INVALID_RANGE);
    }

    /**
     * Verifier que la tranche d'age est de 20 à 40ans
     */
    if (endAgeRange > 40 || startAgeRange < 20) {
      throw new Error(personServiceErrors.QUERY_AGE_INVALID_MIN_MAX_AGE);
    }
    return true;
  }

  /**
   *
   * @param {*} eyeColor La couleur des yeux
   * @returns            Si la couleur des yeux est brown, blue ou green alors return true
   *                     Sinon THROW error
   */

  validateEyeColor(eyeColor) {
    const validColors = ["brown", "blue", "green"];
    if (!validColors.includes(eyeColor)) {
      throw new Error(personServiceErrors.QUERY_EYECOLOR_INVALID_VALUE);
    }
    return true;
  }

  /**
   *
   * @param {*} age La tranche d'age
   * @returns       Returner un objet { startAgeRange, endAgeRange }
   */
  getAgeRangeFromString(age) {
    const [startAgeRange, endAgeRange] = (age || "")
      .split("-")
      .map((i) => parseInt(i));
    return { startAgeRange, endAgeRange };
  }

  /**
   * @param {query} query L'objet de la requete qui permet de filtrer la donnée {age, eyeColor}
   */

  filterData(data, query) {
    const shouldFilterByAge = "age" in query;
    const shouldFilterByEyeColor = "eyeColor" in query;

    /**
     * La requete est vide, alors return data directement
     */
    if (!shouldFilterByAge && !shouldFilterByEyeColor) {
      return data;
    }

    const { startAgeRange, endAgeRange } = this.getAgeRangeFromString(
      query.age
    );
    return data.filter((el) => {
      /**
       * Filtrer par age et par couleur des yeux
       */
      if (shouldFilterByAge && shouldFilterByEyeColor) {
        return (
          el.eyeColor === query.eyeColor &&
          el.age <= endAgeRange &&
          el.age >= startAgeRange
        );
      }
      /**
       * Filtrer par tranche d'age
       */
      if (shouldFilterByAge && !shouldFilterByEyeColor) {
        return el.age <= endAgeRange && el.age >= startAgeRange;
      }

      /**
       * Filtrer p couleur des yeux
       */
      if (!shouldFilterByAge && shouldFilterByEyeColor) {
        return el.eyeColor === query.eyeColor;
      }
    });
  }
}

/**
 *  L'objet de la liste des erreurs possible
 */
export const personServiceErrors = {
  QUERY_AGE_INVALID_INPUT: "Veuillez ecrire un interval d'age, ex : 20-25",
  QUERY_AGE_INVALID_RANGE:
    "Veuillez ecrire un interval d'age de 5 ans, ex: 20-25, 30-35 ...",
  QUERY_AGE_INVALID_MIN_MAX_AGE:
    "Veuillez entrer une tranche d'age qui soit entre 20 et 40 ans ",
  QUERY_EYECOLOR_INVALID_VALUE:
    "La couleur des yeux que vous avez entrer est incorrect",
};
