import express from "express";
const app = express();
const scraper = require("image-scraper");
const cors = require("cors");
app.use(cors());
app.get("/test", (req, res) => {
    console.log("helpp");
    res.send("ok");
});
const imgArray: any[] = [];
app.get("/scrape/:URL", (req, res) => {
    try {
        const URL = decodeURIComponent(req.params.URL);
        const Scraper = new scraper(req.params.URL);
        Scraper.on("image", function (image: any) {
            if (imgArray.includes(image.address) === false) {
                imgArray.push(image.address);
            }
        })
        Scraper.on("end", () => res.send(imgArray));
        Scraper.scrape();
    }
    catch (err) {
    }
});
app.listen(8000);