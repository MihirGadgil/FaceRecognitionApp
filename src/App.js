import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import particleOpts from './particlesjs-config.json';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const app = new Clarifai.App({
  apiKey: '205c71f2cbfe4b3f8ee20866a5dcc10a'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      inputs: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (response) => {
    const faceData = response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      topRow: height * faceData.top_row,
      leftCol: width * faceData.left_col,
      bottomRow: height - (height * faceData.bottom_row),
      rightCol: width - (width * faceData.right_col)
    };
  } 

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({inputs: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.inputs});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.inputs)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log);
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false, route: route})
    } else if (route === 'home') {
      this.setState({isSignedIn: true, route: route})
    }
    this.setState({route: route})
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particleOpts} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'home'
          ? <div>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/> 
            </div> 
          : (
            this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          ) 
          
            
        }    
      </div>
    );
  }
}

export default App;


/*
https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
https://docs.clarifai.com/
https://image.shutterstock.com/image-photo/beautiful-face-young-woman-clean-260nw-149962697.jpg
*/