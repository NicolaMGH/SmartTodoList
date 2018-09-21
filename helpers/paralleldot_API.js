const pd = require('paralleldots');
pd.apiKey = "dGQQviGbhXgGdxJwrYlFLCUAvJs2YtyxYlZgchuaNXg";
const text = 'Do a couple loads of laundry.';


const textClassfication = async (text) => {
  const category = {
    "eat": ["food", "fruit", "restaurant",], 
    "play": ["sport", "game", "music" ], 
    "read": ["news", "magazine", "article","journal"],
    "buy": ["market", "economy", "shares","shopping","grocery"], 
    "watch": ["movie", "TV", "video","show"]};

  let result = await pd.customClassifier(text,category);
  result = JSON.parse(result).taxonomy[0];
  return result
}

module.exports = textClassfication;