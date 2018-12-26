import React from 'react';

function WordList(props) {
  return (
    <ul>
      {
        props.words.map(word => (
          <li key={word}>{word}</li>
        ))
      }
    </ul>
  );
}

export default WordList;
