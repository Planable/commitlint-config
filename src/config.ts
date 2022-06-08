import {
  Commit,
  LintOptions,
  Plugin,
  QualifiedRules,
  Rule,
  RuleConfigCondition,
} from "@commitlint/types";

declare module "@commitlint/types" {
  interface Commit {
    ticket: string | null;
  }
}

const anyEmojiWithSpaceAfter =
  /^([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}](?:[\u{fe00}-\u{fe0f}])?)\s/u;
const optionalPlanableTicketWithSpaceAfter = /(?:\[(.+)\]\s)?/;
const subjectThatDoesNotStartsWithBracket = /([^[\d\s][a-zA-Z](?:(?!\[P-\d).)*)$/;

const headerMatchPlanablePattern: Rule = (parsed: Commit) => {
  const { type, ticket, subject } = parsed;
  if (type === null && ticket === null && subject === null) {
    return [
      false,
      "header must be in format '🌈 [P-11] Replace footer' or '🚧 Replace footer'",
    ];
  }
  return [true];
};

const ticketPattern: Rule = (parsed: Commit) => {
  const planableTicket = /(^P-\d+$)/;

  const { ticket } = parsed;
  if (ticket) {
    if (!planableTicket.test(ticket)) {
      return [
        false,
        "ticket must be in format of a valid Linear issue, for example: [P-11]",
      ];
    }
  }
  return [true];
};

const explainedTypeEnum: Rule<string[]> = (
  parsed: Commit,
  _when?: RuleConfigCondition,
  expectedValue?: string[]
) => {
  const { type } = parsed;
  if (type && expectedValue && !expectedValue.includes(type)) {
    return [false, `type must be one of ${expectedValue}.`];
  }
  return [true];
};

export const planablePlugin: Plugin = {
  rules: {
    "header-match-planable-pattern": headerMatchPlanablePattern,
    "ticket-match-pattern": ticketPattern,
    "explained-type-enum": explainedTypeEnum,
  },
};

export const parserPreset: LintOptions = {
  parserOpts: {
    headerPattern: new RegExp(
      anyEmojiWithSpaceAfter.source +
        optionalPlanableTicketWithSpaceAfter.source +
        subjectThatDoesNotStartsWithBracket.source,
      "u"
    ),
    headerCorrespondence: ["type", "ticket", "subject"],
  },
  plugins: {
    planable: planablePlugin,
  },
};

export const rules: QualifiedRules = {
  "header-match-planable-pattern": [2, "always"],
  "ticket-match-pattern": [2, "always"],
  "explained-type-enum": [
    2,
    "always",
    [
      "✅",
      "🚧",
      "📓",
      "🐞",
      "🚨",
      "👌",
      "⚡️",
      "⬆️",
      "⬇️",
      "✏️",
      "♻️",
      "⭐️",
      "✨",
      "🛠",
      "📦",
      "🌈",
      "🔀",
    ],
  ],
  "subject-case": [2, "always", "sentence-case"],
};
