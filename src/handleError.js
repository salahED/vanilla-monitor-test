import { personServiceErrors } from "./personsTable/PersonsService";

const errorMessages = {
  [personServiceErrors.QUERY_AGE_INVALID_INPUT]:
    "Veuillez écrire un interval d'age, ex : 20-25",
  [personServiceErrors.QUERY_AGE_INVALID_RANGE]:
    "Veuillez écrire un interval d'age de 5 ans, ex: 20-25, 30-35 ...",
  [personServiceErrors.QUERY_AGE_INVALID_MIN_MAX_AGE]:
    "Veuillez entrer une tranche d'age qui soit entre 20 et 40 ans ",
  [personServiceErrors.QUERY_EYECOLOR_INVALID_VALUE]:
    "La couleur des yeux que vous avez entrer est incorrect",
};
export function handleError(error) {
  let errorMessage = "Une erreur est survenue";
  if (typeof error === "string" && error in errorMessages) {
    errorMessage = errorMessages[error];
  }
  /**
   * En cas d'erreur, afficher l'erreur
   */
  document.getElementById("errorContainer").style.display = "flex";
  document.getElementById("errorMessage").innerHTML = errorMessage;
}
