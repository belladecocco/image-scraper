import React, { Component } from 'react';

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
    'https://www.instagram.com/lulusketches/',
    'https://www.nationalgeographic.com/',
    'https://www.architecturaldigest.com/',
    'https://www.bonappetit.com/'
  ];

  async componentDidMount() {
    try {
      const encodedUrls = this.urls.map(url => encodeURIComponent(url));
      let results1 = await fetch(`http://localhost:8000/${encodedUrls}`);
      let results2 = await results1.json() as Array<Picture>;
      for (let result of results2) {
            Object.assign(result, { visible: true });
        }
      await this.setState({
        pictures: results2
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
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
        style={{ display: visible ? 'inline-block' : 'none' }}
      />
    ));
    return <div>{imgtags}</div>;
  }
}

export default App;
