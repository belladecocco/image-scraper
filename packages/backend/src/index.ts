import express from "express";
import { CLIENT_RENEG_WINDOW } from "tls";
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
app.use(cors());

let window: any;
const imgArr: any[] = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://githuhttps://www.archdaily.com/category/galleryb.com');
    await page.evaluate( async () => {
        await window.scrollBy(0, window.innerHeight);
        window.on("image", (image: any) => {
            if(imgArr.includes(image.address) === false) {
                imgArr.push(image.address);
            }
        });

    });

    browser.close();
    return imgArr;
})();

app.listen(8000);