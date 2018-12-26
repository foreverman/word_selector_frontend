import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);


class WordSelector extends Component {
  state = {
    value: '',
    suggestions: []
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionsFetchRequested =({value}) => {

    const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:3001';
    const apiUrl = `${apiHost}/words/fuzzy_search`;
    const postData = {
      word_input: value,
      words_excluded: this.props.selectedWords
    }
    fetch(apiUrl, {
      method: 'POST', 
      body: JSON.stringify(postData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json()).then(suggestions => {
      this.setState({suggestions});
    });
  }

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a word',
      value,
      onChange: this.onChange
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.props.onWordSelected}
      />
    );
  }
}

export default WordSelector;
