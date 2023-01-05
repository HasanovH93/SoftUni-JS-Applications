const { firefox } = require("playwright-firefox");
const { expect } = require("chai");
// (async () => {
//     const browser = await firefox.launch();
//     const page = await browser.newPage();
//     await page.goto('https://melindabeauty.de/')
//     await page.screenshot({path: `example.png`});
//     await browser.close()
// })();

let browser, page; // Declare reusable variables
describe("E2E tests", async function () {
  this.timeout(5000);

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
    await page.close();
  });

  it("loads article titles", async () => {
    await page.goto("http://localhost:5500/Accordion");
    //    await page.click('text=More');
    //    await page.screenshot({ path: 'site.png' })

    await page.waitForSelector(".accordion");

    const content = await page.textContent("#main");
    expect(content).to.contain("Scalable Vector Graphics");
    expect(content).to.contain("Open standard");
    expect(content).to.contain("Unix");
    expect(content).to.contain("ALGOL");
  });

  it("loads article titles", async () => {
    await page.goto("http://localhost:5500/Accordion");

    await page.click("text=More");
    // await page.waitForSelector('.accordion')  
    const visible = await page.isVisible(".accordion p");
    expect(visible).to.be.true;
  });

  it("loads article titles", async () => {
    await page.goto("http://localhost:5500/Accordion");

    await page.click("text=More");
    await page.waitForSelector('.accordion')  
    let visible = await page.isVisible(".accordion p");
    expect(visible).to.be.true;

    await page.click("text=Less");
    visible = await page.isVisible(".accordion p");
    expect(visible).to.be.false;

  });

//   it('fills input form', async () => {
//     await page.goto("http://localhost:5500/Accordion");
//     await page.fill('[name="email"]','peter@abv.bg');
//   })
});
