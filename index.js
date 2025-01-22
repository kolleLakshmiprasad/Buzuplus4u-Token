const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
function processText(text) {
  // Convert to lowercase
  text = text.toLowerCase();
  
  // Remove special characters and numbers
  text = text.replace(/[^a-zA-Z\s]/g, '');
  
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Tokenize
  const tokens = tokenizer.tokenize(text);
  
  // Remove stopwords
  const stopwords = natural.stopwords;
  const filteredTokens = tokens.filter(token => !stopwords.includes(token));
  
  // Perform stemming
  const stemmer = natural.PorterStemmer;
  const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));
  
  return {
    originalText: text,
    tokens: tokens,
    filteredTokens: filteredTokens,
    stemmedTokens: stemmedTokens
  };
}

// Example usage
const sampleText = "I am lakshmi prasad i want to get the permanent job at Buz+4u company after 3 months @#$.";
const result = processText(sampleText);

console.log('Original Text:', result.originalText);
console.log('\nTokens:', result.tokens);
console.log('\nFiltered Tokens (without stopwords):', result.filteredTokens);
console.log('\nStemmed Tokens:', result.stemmedTokens);

// Example of text classification
const classifier = new natural.BayesClassifier();

// Train the classifier with some examples
classifier.addDocument('This product is excellent', 'positive');
classifier.addDocument('Great service and quality', 'positive');
classifier.addDocument('Terrible experience, would not recommend', 'negative');
classifier.addDocument('Poor quality and bad service', 'negative');

classifier.train();

// Test classification
console.log('\nText Classification Examples:');
console.log('Classification:', classifier.classify('This is amazing!'));
console.log('Classification:', classifier.classify('Very disappointed'));