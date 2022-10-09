const { firefox } = require("playwright-firefox");
const { expect } = require("chai");

const url = "http://localhost:5500/";
const mocData = {
  "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
    author: "J.K.Rowling",
    title: "Harry Potter and the Philosopher's Stone",
  },
  "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
    author: "Svetlin Nakov",
    title: "C# Fundamentals",
  },
};

describe("Tests", async function () {
  this.timeout(6000);
  let browser, page;

  before(async () => {
    browser = await firefox.launch({ headless: false, slowMo: 5000 });
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    page.close();
  });

  it("laod all books", async () => {
    await page.route("**/jsonstore/collection/books", (route, requset) => {
      route.fulfill({
        body: JSON.stringify(mocData),
        status: 200,
        headers: {
          "Access-Control-Alow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    });
    await page.goto(url);

    await page.click("text=Load all books");
    await page.waitForSelector("text=Harry Potter");
    const rowData = await page.$$eval("tbody tr", (rows) =>
      rows.map((r) => r.textContent)
    );

    expect(rowData[0]).to.have.string("Harry Potter");
    expect(rowData[0]).to.have.string("Rowling");
    expect(rowData[1]).to.have.string("C# Fundamentals");
    expect(rowData[1]).to.have.string("Nakov");
  });
});
