import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="App">              
                <h1>Meet ZZG. Your personalized, at-home sleep lab. </h1>
                <h2> Personalized sleep hygiene suggestions based on Emotiv EPOC+ EEG data. </h2>
                <Button />                
            </div>

        );
    }
}

class Button extends React.Component {
    state = { counter: 1 };
    
    handleClick = () => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1 
      }));
    };
    
    render() {
      return (
        <button class = "button button1" onClick={this.handleClick}>
          Fall Asleep. 
          
        </button>
      );
    }
  }


/*   class Button2 extends React.Component {
    state = { counter: 1 };
    
    handleClick = () => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1 
      }));
    };
    
    render() {
      return (
        <button class="button button2" onClick={this.handleClick}>
          Fall Asleep 
          
        </button>
      );
    }
  } */

export default App; 