import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import { chromium, Browser } from "playwright";

let sharedBrowser: Browser;

BeforeAll(async () => {
  sharedBrowser = await chromium.launch();
});

AfterAll(async () => {
  await sharedBrowser?.close();
});
