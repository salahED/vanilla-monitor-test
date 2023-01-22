import { errorMessages, getMessageError } from "../handleError";
import { personServiceErrors } from "../personsTable/PersonsService";

describe("handleError", () => {
  it("should return the right error message in case of known error", () => {
    const knownError = new Error(personServiceErrors.QUERY_AGE_INVALID_INPUT);
    expect(getMessageError(knownError)).toBe(errorMessages[personServiceErrors.QUERY_AGE_INVALID_INPUT]);
  });
  it("should return default error message in cane of unknown error", () => {
    expect(getMessageError(new Error("unknown error"))).toBe("Une erreur est survenue");
  });
  it("should return default error message with null error", () => {
    expect(getMessageError(null)).toBe("Une erreur est survenue");
  });
});
