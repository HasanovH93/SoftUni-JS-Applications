const { firefox } = require('playwright-firefox');
const { expect } = require('chai')
// (async () => {
//     const browser = await firefox.launch();
//     const page = await browser.newPage();
//     await page.goto('https://melindabeauty.de/')
//     await page.screenshot({path: `example.png`});
//     await browser.close()
// })();


let browser, page; // Declare reusable variables
describe('E2E tests', async function(done) {
    this.timeout(5000);

  before(async () => { browser = await firefox.launch(); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); }); 

  it('works', async () => {
   await page.goto('http://localhost:5500/Accordion');
   await page.screenshot({ path: 'site.png' })
  })
});
