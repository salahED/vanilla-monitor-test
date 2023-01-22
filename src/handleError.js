import { personServiceErrors } from "./personsTable/PersonsService";

export const errorMessages = {
  [personServiceErrors.QUERY_AGE_INVALID_INPUT]: "Veuillez écrire un intervalle d'age, ex: 20-25",
  [personServiceErrors.QUERY_AGE_INVALID_RANGE]: "Veuillez écrire un intervalle d'age de 5 ans, ex: 20-25, 30-35 ...",
  [personServiceErrors.QUERY_AGE_INVALID_MIN_MAX_AGE]: "Veuillez entrer une tranche d'âge entre 20 et 40 ans",
  [personServiceErrors.QUERY_EYECOLOR_INVALID_VALUE]:
    "La couleur des yeux que vous avez entré est incorrecte, Valeurs valides: brown, blue, green",
};

export function getMessageError(error) {
  const { message } = error || {};
  if (typeof message === "string" && message in errorMessages) {
    return errorMessages[message];
  }
  let defaultMessage = "Une erreur est survenue";
  return defaultMessage;
}

export function handleError(error) {
  const errorMessage = getMessageError(error);
  /**
   * En cas d'erreur, afficher l'erreur
   */
  document.getElementById("errorContainer").style.display = "flex";
  document.getElementById("errorMessage").innerHTML = errorMessage;
}
