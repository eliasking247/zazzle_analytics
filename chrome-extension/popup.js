function analyzeText(text) {
  if (!text || text.trim() === '') {
    return '<p class="error">No text content found on this page.</p>';
  }

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);

  const wordCount = words.length;

  const frequencyMap = {};
  words.forEach(word => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });

  const sortedWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  let resultHTML = `
    <div class="result">
      <h2>Analysis Results</h2>
      <div class="stat">
        <span class="label">Total Words:</span>
        <span class="value">${wordCount}</span>
      </div>
      <h3>Top 5 Most Frequent Words:</h3>
      <ul class="word-list">
  `;

  sortedWords.forEach(([word, count], index) => {
    resultHTML += `
      <li>
        <span class="rank">${index + 1}.</span>
        <span class="word">${word}</span>
        <span class="count">(${count})</span>
      </li>
    `;
  });

  resultHTML += `
      </ul>
    </div>
  `;

  return resultHTML;
}

window.addEventListener('load', async () => {
  const outputDiv = document.getElementById('output');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    if (results && results[0] && results[0].result) {
      const extractedText = results[0].result;
      const analysisResult = analyzeText(extractedText);
      outputDiv.innerHTML = analysisResult;
    } else {
      outputDiv.innerHTML = '<p class="error">Failed to extract text from page.</p>';
    }
  } catch (error) {
    outputDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
});
