const natural = require('natural');
const fs = require('fs');
const data = fs.readFileSync("./toDoListModel.json", "utf-8");
const model = natural.BayesClassifier.restore(JSON.parse(data));
const paralleldots = require('./paralleldot_API.js')

function npl_pd(text){
  let result;
  let npl_result = model.getClassifications(text);
  if ((npl_result[0].value - npl_result[1].value) / npl_result[0].value < 0.1){
    result = paralleldots(text)
  }
  else{
    result = npl_result[0].label;
  }
  return result;
}

module.exports = npl_pd;

