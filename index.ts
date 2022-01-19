import {
  Commit,
  Rule,
  RuleConfigCondition,
  UserConfig,
} from "@commitlint/types";

const anyEmojiWithSpaceAfter =
  /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}])\s/u;
const optionalPlanableTicketWithSpaceAfter = /(?:\[(.+)\]\s)?/;
const planableTicket = /(P-\d+)/;
const subjectThatDoesNotStartsWithBracket = /([^[].*)/;

interface ExtendedCommit extends Commit {
  ticket: string | null;
}

const headerMatchPlanablePattern = (parsed: ExtendedCommit) => {
  const { type, ticket, subject } = parsed;
  if (type === null && ticket === null && subject === null) {
    return [
      false,
      "header must be in format '✅ [P-11] Replace footer' or '✅ Replace footer'",
    ];
  }
  if (ticket) {
    if (!planableTicket.test(ticket)) {
      return [
        false,
        "ticket must be in format of a valid Linear issue: [P-11]",
      ];
    }
  }
  return [true, ""];
};

const explainedTypeEnum: Rule<string[]> = (
  parsed: Commit,
  _when?: RuleConfigCondition,
  expectedValue?: string[]
) => {
  const { type } = parsed;
  if (type && expectedValue && !expectedValue.includes(type)) {
    return [
      false,
      `type must be one of ${expectedValue}
  see https://www.notion.so/planable/Emojis-in-commit-messages-7ff175b3d2d442e089c2a4b583cd8383`,
    ];
  }
  return [true, ""];
};

const planableConfig: UserConfig = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        anyEmojiWithSpaceAfter.source +
          optionalPlanableTicketWithSpaceAfter.source +
          subjectThatDoesNotStartsWithBracket.source,
        "u"
      ),
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        // @ts-ignore
        "header-match-planable-pattern": headerMatchPlanablePattern,
        "explained-type-enum": explainedTypeEnum,
      },
    },
  ],
  rules: {
    "header-match-planable-pattern": [2, "always"],
    "type-empty": [2, "never"],
    "explained-type-enum": [
      2,
      "always",
      [
        "✅ ",
        "🚧 ",
        "📓 ",
        "🐞 ",
        "🚨 ",
        "👌 ",
        "⚡️ ",
        "⬆️ ",
        "⬇️ ",
        "✏️ ",
        "♻️ ",
        "⭐️ ",
        "✨ ",
        "🛠 ",
        "📦 ",
        "🌈 ",
        "🔀 ",
      ],
    ],
    "subject-case": [2, "always", "sentence-case"],
  },
};

export = planableConfig;
