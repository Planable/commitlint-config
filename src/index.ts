import { UserConfig } from "@commitlint/types";
import { parserPreset, rules, planablePlugin } from "./config";

const planableConfig: UserConfig = {
  helpUrl:
    "https://www.notion.so/planable/Emojis-in-commit-messages-7ff175b3d2d442e089c2a4b583cd8383",
  parserPreset,
  plugins: [planablePlugin],
  rules,
};

export = planableConfig;
