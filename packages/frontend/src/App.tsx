import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./imageGrid.css";
import { async } from "q";

var request = require("request");
interface Props {}
interface Picture {
  src: string;
  srcSet: string;
  visible: boolean;
}
interface State {
  pictures: Array<Picture>;
}
class App extends Component<Props, State> {
  state = { pictures: new Array<Picture>() };

  urls = [
    "https://www.nationalgeographic.com/",
    "https://www.architecturaldigest.com/",
    "https://www.bonappetit.com/",
    "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/MonetateTests/EmailBackgrounds/MossForest.jpg"
  ];

  async componentDidMount() {
    try {
      let results = await Promise.all(
        this.urls.map(async url => {
          let arr = await fetch(
            `http://localhost:8000/${encodeURIComponent(url)}`
          );
          return arr.json() as Promise<Array<Picture>>;
        })
      );
      for (let result of results) {
        const visiblePictures = result.map(r => Object.assign(r, {visible: true}))
        await this.setState({
          pictures: this.state.pictures.concat(visiblePictures)
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.state);
    const handleHide = (i: number) => {
      const pictures = [...this.state.pictures];
      pictures[i].visible = false;
      this.setState({ pictures });
    };
    const images = [...this.state.pictures];
    const imgtags = images.map(({ src, srcSet, visible }, i) => (
      <img
        src={src}
        srcSet={srcSet}
        key={i}
        height="300"
        onClick={() => handleHide(i)}
        style={{ display: visible ? "inline-block" : "none" }}
      />
    ));
    return <div>{imgtags}</div>;
  }
}

export default App;
