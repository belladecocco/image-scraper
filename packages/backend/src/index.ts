import express from 'express';
import { watchFile } from 'fs';
const app = express();
import puppeteer from 'puppeteer';
const cors = require('cors');
app.use(cors());

const fetchImages = async (URL: string) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.keyboard.press('Escape');
    const escapeTimer = setInterval(() => {
      page.keyboard.press('Escape');
    }, 500);

    const imageData = await page.evaluate(() => {
      return new Promise<Array<{src: string, srcSet: string}>>((resolve, reject) => {
        let totalHeight = 0;
        let distance = 250;
        let scrollTimer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(scrollTimer);
            const imgArr = Array.from(document.images);
            const srcArr = imgArr.map(img => ({
              src: img.src,
              srcSet: img.srcset
            }));
            resolve(srcArr);
          }
        }, 50);
      });
    });
    clearInterval(escapeTimer);
    browser.close();
    return imageData;
  } catch (err) {
    console.log(err);
    return [];
  }
};
app.get('/:URLSARR', async (req, res) => {
  const urls: Array<string> = req.params.URLSARR.split(",");
  const dataArr = await Promise.all(urls.map((url: string) => fetchImages(url)));
  const data = dataArr.reduce( (acc, siteImgs) =>  acc.concat(siteImgs), []);
  res.send(data);
});

app.listen(8000);
