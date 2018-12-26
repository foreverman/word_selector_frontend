import React, { Component } from 'react';
import WordSelector from './WordSelector'
import WordList from './WordList'
import {saveSelectedWord, getSelectedWords} from './selectedWordsAPI'

class App extends Component {
  state = {
    selectedWords: []
  }

  onWordSelected = (event, {suggestion}) => {
    saveSelectedWord(suggestion);
    this.setState((prevState) => (
      { selectedWords: prevState.selectedWords.concat([suggestion]) }
    ));
  }

  componentDidMount = () => {
    const selectedWords = getSelectedWords();
    if (selectedWords.length > 0) {
      this.setState({selectedWords: selectedWords});
    }
  }

  render() {
    return (
      <div className="App">
        <WordSelector 
          onWordSelected={this.onWordSelected} 
          selectedWords={this.state.selectedWords}
        />
        <WordList words={this.state.selectedWords} />
      </div>
    );
  }
}

export default App;
