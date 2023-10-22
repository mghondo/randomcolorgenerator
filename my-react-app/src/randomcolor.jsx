import React, { Component } from 'react';
import './App.css';

class ColorSchemeGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: Array(6).fill(null).map(() => this.generateRandomColor()),
      lockedColors: Array(6).fill(false),
    };
  }

  generateRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }

  lockColor(index) {
    const { lockedColors } = this.state;
    lockedColors[index] = true;
    this.setState({ lockedColors });
  }

  regenerateColor(index) {
    if (!this.state.lockedColors[index]) {
      const { colors } = this.state;
      colors[index] = this.generateRandomColor();
      this.setState({ colors });
    }
  }

  copyColorToClipboard(color) {
    navigator.clipboard.writeText(color).then(function() {
      alert(`Copied: ${color}`);
    }).catch(function() {
      alert('Copy failed');
    });
  }

  render() {
    const { colors, lockedColors } = this.state;
    return (
      <div className="container">
        <div className="jumbotron text-center" style={{ height: '250px', backgroundColor: 'green', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Random Color Scheme Generator</h1>
        </div>
        <div className="row">
          {colors.map((color, index) => (
            <div key={index} className="col-md-4">
              {/* <div className="color-code">{color}</div> */}
              <div
                className="color-box"
                style={{ backgroundColor: color, height: '400px',borderRadius:'10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}
              >
                <button
                className="btn btn-secondary"
                onClick={() => this.regenerateColor(index)}
                >
                Regenerate
                </button>
                <br/>
                <button
                className="btn btn-primary"
                onClick={() => this.copyColorToClipboard(color)}
                >
                Copy Hex: {color}
                </button>
              </div>
              {lockedColors[index] && <div className="locked-indicator">Locked</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorSchemeGenerator;
