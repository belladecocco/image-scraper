# image-scraper
 collects images from multiple urls using puppeteer and displays images using React with feature to hide images on click
 ## to start
 1. clone the repo
 2. `npm install`
 ## to run
 `npm start` back end and front end
 ## to edit
 * currently, the project requires hard-coding the urls you want to scrape.
 replace the urls in [app.tsx](https://github.com/belladecocco/image-scraper/blob/master/packages/frontend/src/App.tsx)
 `urls: [
 "https://www.nationalgeographic.com/",
 "https://www.architecturaldigest.com/",
 "https://www.bonappetit.com/"
 ];`
  
  * change `headless` to `false` if you would like to see Chromium activity (i.e. website scrolling to load images) in [index.ts](https://github.com/belladecocco/image-scraper/blob/master/packages/backend/src/index.ts)
  `const browser = await puppeteer.launch({ headless: true });`
  ## to use backend
  GET `/:URL` where URL is encoded
  ## next steps
  * build feature to pass in a list of urls to eliminate hard coding
  * build out use cases for collecting the images such as:
    * combining multiple instagram pages' images
    * saving favorite url lists
    * creating inspiration boards
    * going to links onClick
    * sending link to image collection
    * saving favorite images to database
    * displaying favorite images

