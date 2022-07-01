import { UserConfig } from "@commitlint/types";
import { parserPreset, rules, planablePlugin } from "./config";

const planableConfig: UserConfig = {
  helpUrl:
    "https://github.com/Planable/commitlint-config#emoji-descriptions=",
  parserPreset,
  plugins: [planablePlugin],
  rules,
};

export = planableConfig;
