import express from "express";
import { watchFile } from "fs";
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
app.use(cors());

const fetchImages = async (URL: any) => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: "networkidle2" });

    await page.keyboard.press("Escape");

    const imageData = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            const imgArr = Array.from(document.images);
            const srcArr = imgArr.map(img => img.src);
            resolve(srcArr);
          }
        }, 100);
      });
    });
    browser.close();
    return imageData;
  } catch (err) {
    console.log(err);
  }
};
app.get("/:URL", async (req, res) => {
  const URL = decodeURIComponent(req.params.URL);
  const data = await fetchImages(URL);
  res.send(data);
});

app.listen(8000);
