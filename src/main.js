import { PersonsService } from "./services/PersonsService";
import { PersonsTableRenderer } from "./services/PersonsTableRenderer";

const personService = new PersonsService();
const renderer = new PersonsTableRenderer();

export const main = async () => {
  /**
   * Recupiration des params depuis URL
   */
  const params = new URLSearchParams(window.location.search);
  const age = params.get("age");
  const eyeColor = params.get("eyeColor");

  /**
   * Construction de la requete
   */
  const query = {};
  if (age) {
    query.age = age;
  }
  if (eyeColor) {
    query.eyeColor = eyeColor;
  }

  try {
    /**
     * Recuperation de la donnée afin de l'afficher sur l'ecran avec la fonction render
     */
    const data = await personService.fetchData(query);
    renderer.render(data);
  } catch (errorMessage) {
    /**
     * En cas d'erreur, afficher l'erreur
     */
    document.getElementById("erreurMessage").innerHTML = errorMessage;
  }
};
