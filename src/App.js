import React, { Component } from "react";
import "./App.css";
import Image from "./components/images"
//class based (smart) component handles state
//function based(dumb) displays information, pass stuff to it then display it. No state on its own.
class App extends Component {
  //always be a render function that returns a value, just like a regular function
  state = {
    score: 0,
    pictures: [
    "./imgs/cassette.png",
    "./imgs/diamond.jpg",
    "./imgs/favicon.png",
    "./imgs/fitness.jpg", 
    "./imgs/friends.jpg",
    "./imgs/hamburger.png",
    "./imgs/hourglass.jpg",
    "./imgs/ignasi_pattern_s.png",
    "./imgs/movie.jpg",
    "./imgs/shop.jpg",
    "./imgs/third-eye.jpg",
    "./imgs/train.jpg"
  ],
    clicked: [],
    highScore: 0,
    win: false,
    lose: false
  };
  
  handleClick = (event) => {
    const cutString = event.target.src.split("/")[4]
    const newArray = [...this.state.clicked]
    newArray.push(cutString)
    this.shuffle(this.state.pictures)
    this.hasDuplicates(newArray)
    // console.log(this.state.clicked)
  }

  // generic stack overflow array randomizer
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // console.log(array)
    return array;
  }
  
  resetScore = () => {
    this.setState({
      score: 0,
      clicked: [],
      win: false,
      lose: false
    })
  }

  hasDuplicates(array) {
    console.log(array)
      // stackoverflow duplicate checker
      if((new Set(array)).size !== array.length) {
        console.log("true")
        this.resetScore()
      } else {
        const score = array.length
        if(score > this.state.highScore) {
          this.setState({
            score: score,
            highScore: score,
            clicked: []
          }) 
          if (score === 6) {
            this.setState({
              win: true,
            })
          }
        } else {
        console.log("false")
        this.setState({
          clicked: [...array],
          score: array.length
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div>state{this.state.score}</div>
        <div>high score{this.state.highScore}</div>
        {this.state.win ? <div>You won<button onClick={this.resetScore}>Play Again?</button></div> : null}
    {this.state.pictures.map(picture => <Image key={picture} src={picture} handleClick={this.handleClick} alt="casette"></Image> )} 
      </div>
    );
  }
}
 
export default App;


