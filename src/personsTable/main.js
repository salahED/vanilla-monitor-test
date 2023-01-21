import "./tableStyles.css";
import { PersonsService } from "./PersonsService";
import { TableRenderer } from "./TableRenderer";
import { handleError } from "./handleError";

const personService = new PersonsService();
const renderer = new TableRenderer();

export const main = async () => {
  /**
   * Recupération des query params depuis URL
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
     * Recupération de la donnée afin de l'afficher sur l'ecran avec la fonction render
     */
    const data = await personService.fetchData(query);
    renderer.render(data);
  } catch (error) {
    handleError(error);
  }
};
