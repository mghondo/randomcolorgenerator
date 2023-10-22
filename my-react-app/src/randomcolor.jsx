import React, { Component } from 'react';
import './App.css';

class ColorSchemeGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: Array(6).fill(null).map(() => this.generateRandomColor()),
      lockedColors: Array(6).fill(false),
      showColorList: false, // Added state for showing/hiding the color list
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

  toggleColorList() {
    this.setState((prevState) => ({
      showColorList: !prevState.showColorList,
    }));
  }

  regenerateColor(index) {
    if (!this.state.lockedColors[index]) {
      const { colors } = this.state;
      colors[index] = this.generateRandomColor();
      this.setState({ colors });
    }
  }

  copyAllColorsToClipboard() {
    const { colors } = this.state;
    const allColorsText = colors
      .map((color, index) => `Color ${index + 1}: ${color}`)
      .join('\n');
    navigator.clipboard.writeText(allColorsText).then(function() {
      alert('Copied all colors');
    }).catch(function() {
      alert('Copy failed');
    });
  }

  // Update copyColorToClipboard to accept the index
  copyColorToClipboard(index) {
    const { colors } = this.state;
    const color = colors[index];
    navigator.clipboard.writeText(color).then(function() {
      alert(`Copied: ${color}`);
    }).catch(function() {
      alert('Copy failed');
    });
  }

  render() {
    const { colors, lockedColors, showColorList } = this.state;
    const jumbotronStyle = {
 // Apply the animation
    };
    // const jumbotronStyle = {
    //   height: '350px',
    //   backgroundImage: `url(./bg-image-20.jpg)`, // Set the background image
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   marginBottom: '30px',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // };
    return (
      <>
        <div className="jumbotron text-center">
          <h1 style={{ color: 'white' }}>Random Color Scheme Generator</h1>
        </div>
        <div className="container">
          <div className="color-list" style={{ paddingBottom: '30px' }}>
            <button
              className="btn btn-primary"
              style={{ marginBottom: '20px' }}
              onClick={() => this.toggleColorList()} // Add click event to toggle color list
            >
              {showColorList ? 'Hide Color List' : 'Show Color List'}
            </button>
            {showColorList && ( // Render color list only if showColorList is true
              <>
              <p>Click on any color to copy the hex.</p>
              <ul className="list-group center-ul" style={{width: '25%'}}>
                {colors.map((color, index) => (
                  <li
                    className="list-group-item color-item"
                    key={index}
                    onClick={() => this.copyColorToClipboard(index)} // Add click event to copy hex
                  >
                    <div>
                      Color {index + 1}: {color}
                    </div>
                  </li>
                ))}
                <li className="list-group-item">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.copyAllColorsToClipboard()}
                  >
                    Copy All Colors
                  </button>
                </li>
              </ul>
              </>
            )}
          </div>
          <div className="row">
            {colors.map((color, index) => (
              <div key={index} className="col-md-4">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: color,
                    height: '400px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.regenerateColor(index)}
                  >
                    Regenerate
                  </button>
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={() => this.copyColorToClipboard(index)}
                  >
                    Copy Hex: {color}
                  </button>
                </div>
                {lockedColors[index] && <div className="locked-indicator">Locked</div>}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ColorSchemeGenerator;
