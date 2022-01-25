import commitlint from "@commitlint/lint";
import { rules, parserPreset } from "../src/config";

const lint = (input: string) => commitlint(input, rules, parserPreset);

describe("Invalid commits", () => {
  test.concurrent.each([
    ["No emoji", "Add tests", "header-match-planable-pattern"],
    ["Wrong emoji", "😂 Add tests", "explained-type-enum"],
    ["No sentence case", "✅ add tests", "subject-case"],
    ["Wrong ticket format", "✅ [DD] Add tests", "ticket-match-pattern"],
    ["Too much space after emoji", "✅  [P-4605] Add tests", "header-match-planable-pattern"],
    ["Too much space after ticket", "✅ [P-4605]  Add tests", "header-match-planable-pattern"],
    ["Too much space before subject", "✅  Add tests", "header-match-planable-pattern"],
    ["Not begin with emoji", "_✅ [P-4605] Add tests", "header-match-planable-pattern"],
    ["Suject starts with non letter", "✅ [P-4605] 5dd tests", "header-match-planable-pattern"],
    ["Ticket bracket not closed", "✅ [P-4605 Add tests", "header-match-planable-pattern"],
  ])(
    "%s: %p should return %p error",
    // @ts-ignore
    async (_desc: string, commitMessage: string, expectedError: string) => {
      const { valid, errors } = await lint(commitMessage);
      expect(valid).toBeFalsy();
      expect(errors).toHaveLength(1);
      const [error] = errors;
      expect(error.name).toBe(expectedError);
    }
  );
});
