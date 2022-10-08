const { firefox } = require('playwright-firefox');
(async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto('https://melindabeauty.de/')
    await page.screenshot({path: `example.png`});
    await browser.close()
})();