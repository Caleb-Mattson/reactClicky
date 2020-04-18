import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import pictures from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array



  // state = {
  //   friends,
  //   score: 0,
  //   hiScore: 0,
  //   clicked: []
  // };

  //   componentDidMount() {
  //     this.displayImage();
  //   }

  //   displayImage() {
  //     this.setState({friends: this.shuffleFunc(this.state.friends)})
  //   }

  //  shuffleFunc = data => {
  //     let i = data.length - 1;
  //     while (i > 0) {
  //       const randomizer = Math.floor(Math.random() * (i + 1));
  //       const temp = data[i];
  //       data[i] = data[randomizer];
  //       data[randomizer] = temp;
  //       console.log(temp);
  //       i--;
  //     }

  //     return data;

  //   }

  //   gamePlay() {
  //     const {id} = this.state.friends
  //     if (this.state.friends.isClicked === true) {

  //       this.state.score.setState(0);
  //       this.state.friends.map( friend => {
  //         return friend.isClicked.setState(false);
  //       });
  //       this.displayImage();
  //     } else {

  //       const findId = this.state.friends.id.find(id)
  //       console.log(findId)
  //       this.displayImage();
  //     }
  //   } 

  constructor(props) {
    super(props)
    this.state =
    {
      pictures,
      score: 0,
      hiScore: 0,
      clicked: []
    };
    this.shuffleCards();
    this.click = this.click.bind(this)
  };

//  componentDidMount() {
//     this.shuffleCards(this.state.pictures)
//   } 

  shuffleFunc = data => {
    let i = data.length - 1;
    while (i > 0) {
      const randomizer = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[randomizer];
      data[randomizer] = temp;
      console.log(temp);
      i--;
    }

    return data;

  }

  shuffleCards() {
    return this.setState({pictures: this.shuffleFunc(this.state.pictures)})
  }

  increaseScore(){
    
    if (this.state.score === this.state.hiScore) {
      this.setState({hiScore: this.state.hiScore + 1})
      this.setState({score: this.state.score + 1})
    } else {
      this.setState({score: this.state.score + 1})
    }
    console.log("WOO POINTS!")
  }

  click(pic) {
    this.checkCondition(pic);
  }

  checkCondition = pic => {
    const { id } = pic;
    const isClicked = this.state.clicked.find(storedId => {
      console.log("Stored ID: " + storedId);
      return storedId === id;
    });
    if (isClicked) {
      this.gameLoss();
    } else if (this.state.score === 11) {
      this.increaseScore();
      this.gameWin();
    } else {
      let { clicked } = this.state;
      clicked = [].concat(clicked);
      clicked.push(id);
      this.setState({clicked});
      this.increaseScore();
      this.shuffleCards();
    }
  }

  gameReset() {
    this.setState({
      score: 0,
      clicked: []
    });
    this.shuffleCards();
  }

  gameLoss() {
    this.gameReset();
  }

  gameWin() {
    this.gameReset();
  }


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Score: <span>{this.state.score}</span> | High-Score: <span>{this.state.hiScore}</span></Title>
        <div className="container">
          {this.state.pictures.map(friend => {
            return (<FriendCard
              onClick={() => { this.click(friend) }}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
            />)
          })}
        </div>
      </Wrapper>
    );
  }
}

export default App;
