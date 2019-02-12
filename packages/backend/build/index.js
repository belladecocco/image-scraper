"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var scraper = require("image-scraper");
var cors = require("cors");
app.use(cors());
app.get("/test", function (req, res) {
    console.log("helpp");
    res.send("ok");
});
var imgArray = [];
app.get("/scrape/:URL", function (req, res) {
    try {
        var URL = decodeURIComponent(req.params.URL);
        var Scraper = new scraper(req.params.URL);
        Scraper.on("image", function (image) {
            if (imgArray.includes(image.address) === false) {
                imgArray.push(image.address);
            }
        });
        Scraper.on("end", function () { return res.send(imgArray); });
        Scraper.scrape();
    }
    catch (err) {
    }
});
app.listen(8000);
