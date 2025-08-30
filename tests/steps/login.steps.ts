import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { chromium, Browser, Page, BrowserContext } from "playwright";

let browser: Browser;
let context: BrowserContext;
let page: Page;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

Given("estoy en la página de {string}", async (path: string) => {
  if (!browser) {
    browser = await chromium.launch();
  }
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(`${BASE_URL}/${path}`); 
});

When("ingreso el email {string}", async (email: string) => {
  await page.fill('input[name="email"]', email);
});

When("ingreso la contraseña {string}", async (pwd: string) => {
  await page.fill('input[name="password"]', pwd);
});

When("presiono el botón {string}", async (label: string) => {
  await page.getByRole("button", { name: label }).click();
});

Then("soy redirigido a {string}", async (expectedPath: string) => {
  await page.waitForURL(`**${expectedPath}`);
  const url = page.url();
  assert.ok(url.endsWith(expectedPath), `URL actual: ${url}`);
});

Then("permanezco en {string}", async (expectedPath: string) => {
  await page.waitForTimeout(200);
  const url = page.url();
  assert.ok(url.endsWith(expectedPath), `URL actual: ${url}`);
});

Then("veo el texto {string}", async (text: string) => {
  await page.waitForLoadState("networkidle");

  const locator = page.getByText(text, { exact: false });

  await locator.waitFor({ state: "visible", timeout: 4000 });

  const visible = await locator.isVisible();
  assert.strictEqual(visible, true, `No se ve el texto: ${text}`);
});
