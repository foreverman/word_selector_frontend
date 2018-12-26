export const saveSelectedWord = (word) => {
  window.localStorage.setItem(
    'selectedWords', 
    JSON.stringify(getSelectedWords().concat([word]))
  );
}

export const getSelectedWords = () => {
  const selectedWordsJson = window.localStorage.getItem('selectedWords');
  let selectedWords = [];
  if (selectedWordsJson) {
    selectedWords = JSON.parse(selectedWordsJson);
  } 
  return selectedWords;
}


