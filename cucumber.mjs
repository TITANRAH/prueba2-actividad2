const config = {
  default: {
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "html:tests/reports/cucumber-report.html",
      "json:tests/reports/cucumber-report.json",
    ],
    paths: ["tests/features/**/*.feature"],
    publishQuiet: true,
    parallel: 1,
    retry: 1,
  },
};

export default config;
