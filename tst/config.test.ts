import commitlint from "@commitlint/lint";
import { rules, parserPreset } from "../src/config";

const lint = (input: string) => commitlint(input, rules, parserPreset);

describe.skip("Invalid commits", () => {
  // it.each([
  //   ["No emoji", "Add tests"]
  // ])("");
  // it("Add tests -> No emoji", async () => {
  //   const { valid, errors } = await lint("Add tests");
  //   expect(valid).toBeFalsy();
  //   expect(errors).toHaveLength(1);
  //   const [ error ] = errors;
  //   expect(error.name).toBe("type-empty");
  // });
  it("😂 Add tests -> Wrong emoji", async () => {
    const o = await lint("😂 Add tests");
    console.log(JSON.stringify(o, null, 2));

    // expect(valid).toBeFalsy();
    // expect(errors).toHaveLength(1);
    // const [ error ] = errors;
    // expect(error.name).toBe("type-");
  });
  it("✅ add tests -> No sentence case", async () => {
    const { valid, errors } = await lint("✅ add tests");
    expect(valid).toBeFalsy();
    expect(errors).toHaveLength(1);
    const [error] = errors;
    expect(error.name).toBe("type-empty");
  });
  it("✅ [DD] Add tests -> Wrong ticket format", async () => {
    const { valid, errors } = await lint("✅ [DD] Add tests");
    expect(valid).toBeFalsy();
    expect(errors).toHaveLength(1);
    const [error] = errors;
    expect(error.name).toBe("type-empty");
  });
});
