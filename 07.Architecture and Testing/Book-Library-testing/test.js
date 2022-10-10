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
  let browser, page;

  before(async () => {
    browser = await firefox.launch();
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

  it('creates book', async () => {
     await page.goto(url);

     await page.fill('input[name=title]', 'Title');
     await page.fill('input[name=author]', 'Author');

   const [ request ] =  await Promise.all([
      page.waitForRequest((request) => request.method() == 'POST'),
      page.click('text=Submit')
     ]);

      const data = JSON.parse(request.postData());
      expect(data.title).to.equal('Title');
      expect(data.author).to.equal('Author');
    });

    
});
