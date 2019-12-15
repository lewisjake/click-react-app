
import React, { Component } from 'react';
import Navbar from './navbar';
import Container from './container';
import Footer from './footer';
import Banner from './banner';
import images from '../images';

class clickygame extends Component {
    state = {
        score: 0,
        highScore = 0,

        // store value to navMessage based on true or false click
        navMessageColor: '',

        // navMessage containd intro, true or false message
        navMessage: "Click on an image to begin!",

        // arry of images
        characters: this.shuffleArray(),

        // tracks each clicked image
        wasClicked()
    };

    // binds this to checkClicked to see the current state of the character
    clickEvent = this.checkClicked.bind(this);

    shuffleArray() {
        // creates a new array of characters to modify by value
        const newArr = images.slice();

        // stores the shuffled array
        const shuffleArr = [];

        // each time a loop runs through the index it gets spliced from newArr and gets
        // a random index based on the current length of newArr and pushed it into shuffleArr

        while (newArr.length > 0) {
            shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
        }

        return shuffleArr;
    }

    // check if an image was clicked
    checkClicked(clickedElement) {
        // creates copy of wasClicked array and stores all the clicked images in it
        const previousState = this.state.wasClicked.slice();

        // shuffle images
        const shuffled = this.shuffleArray();

        // tally score
        let score = this.state.score;
        let highScore = this.state.highScore;

        // if the clicked image isn't in wasClicked array, then the score will increase
        if (!this.state.wasClicked.includes(clickedElement)) {
            // if score = highScore update the highScore
            if (score === highScore) {
                score++;
                highScore++;
            }
            // else statement if score is not equal to highScore update score
            else {
                score++;
            }
            // add clicked image to wasClicked
            previousState.push(clickedElement);
        }
        // resets score if the same image was clicked twice
        if (this.state.wasClicked.includes(clickedElement)) {
            let score = 0;
            return this.setState({
                score: score,
                highScore: highScore,
                navMessageColor: 'incorrect',
                navMessage: 'Incorrect guess!',
                characters: shuffled,
                wasClicked: [],
            });
        }

    // if this runs, then the same element has not been clicked twice and the score is increased
    this.setState({
        score: score,
        highScore: highScore,
        navMessageColor: 'correct',
        navMessage: 'You Guessed Correctly!',
        characters: shuffled,
        wasClicked: previosState,
    });
    // removes the green correct indicator on a successful click after .5s to re-render the class on each success
    return setTimeout(() => this.setState({ navMessageColor: '' }), 500);
  }

// renders score to the navbar.
  // passes the randomized state.allCharacters array to Container to create a Character component for each image.
  // passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar 
        score={state.score}
        highScore={state.navMessage}
        navMessageColor={state.navMessageColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}
