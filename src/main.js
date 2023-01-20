import { PersonsService } from "./PersonsService";
import { PersonsTableRenderer } from "./PersonsTableRenderer";

const service = new PersonsService();
const renderer = new PersonsTableRenderer();

export const main = async () => {
  const params = new URLSearchParams(window.location.search);

  const age = params.get("age");
  const eyeColor = params.get("eyeColor");

  const query = {};
  if (age) {
    query.age = age;
  }
  if (eyeColor) {
    query.eyeColor = eyeColor;
  }

  try {
    const data = await service.fetchData(query);
    renderer.render(data);
  } catch (error) {
    console.log(error.message);
  }
};
