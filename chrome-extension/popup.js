document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const resultsEl = document.getElementById('results');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url || !tab.url.includes('zazzle.com')) {
      showError('This page is not a Zazzle product page.');
      return;
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    if (!results || !results[0] || !results[0].result) {
      showError('Unable to extract product data.');
      return;
    }

    const productData = results[0].result;

    if (!productData.title && !productData.price) {
      showError('This page is not a Zazzle product page.');
      return;
    }

    const analytics = analyzeProduct(productData);
    renderResults(productData, analytics);

    loadingEl.style.display = 'none';
    resultsEl.style.display = 'block';

  } catch (error) {
    showError('An error occurred while analyzing the product.');
    console.error(error);
  }
});

function showError(message) {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');

  loadingEl.style.display = 'none';
  errorEl.style.display = 'block';
  errorEl.querySelector('p').textContent = message;
}

function analyzeProduct(data) {
  const descWords = data.description ? data.description.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = descWords.length;
  const titleLength = data.title ? data.title.length : 0;
  const tagCount = data.tags ? data.tags.length : 0;

  const keywords = extractKeywords(data.description, data.title);

  const seoScore = calculateSEOScore({
    titleLength,
    wordCount,
    tagCount,
    hasDescription: wordCount > 0,
    hasPrice: !!data.price,
    hasMerchant: !!data.merchant
  });

  const recommendations = generateRecommendations({
    titleLength,
    wordCount,
    tagCount,
    seoScore
  });

  return {
    wordCount,
    titleLength,
    tagCount,
    keywords,
    seoScore,
    recommendations
  };
}

function extractKeywords(description, title) {
  const text = `${description} ${title}`.toLowerCase();
  const words = text.match(/\b[a-z]{3,}\b/g) || [];

  const stopWords = new Set(['the', 'and', 'for', 'with', 'from', 'this', 'that', 'have', 'are', 'was', 'were', 'been', 'has', 'had', 'you', 'your', 'our', 'their', 'will', 'can', 'about', 'all', 'but', 'not', 'more']);

  const wordFreq = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ word, count }));
}

function calculateSEOScore({ titleLength, wordCount, tagCount, hasDescription, hasPrice, hasMerchant }) {
  let score = 0;

  if (titleLength >= 30 && titleLength <= 80) score += 25;
  else if (titleLength >= 20) score += 15;
  else if (titleLength >= 10) score += 5;

  if (wordCount >= 100) score += 25;
  else if (wordCount >= 50) score += 15;
  else if (wordCount >= 20) score += 5;

  if (tagCount >= 10) score += 20;
  else if (tagCount >= 5) score += 12;
  else if (tagCount >= 1) score += 5;

  if (hasDescription) score += 10;
  if (hasPrice) score += 10;
  if (hasMerchant) score += 10;

  return Math.min(100, score);
}

function generateRecommendations({ titleLength, wordCount, tagCount, seoScore }) {
  const recs = [];

  if (seoScore === 100) {
    recs.push('Excellent! This product has strong SEO optimization.');
  } else {
    if (titleLength < 30) {
      recs.push('Consider expanding the product title (aim for 30-80 characters).');
    } else if (titleLength > 80) {
      recs.push('Title may be too long. Consider keeping it under 80 characters.');
    }

    if (wordCount < 50) {
      recs.push('Add more detailed product description (aim for 100+ words).');
    }

    if (tagCount < 5) {
      recs.push('Add more relevant tags to improve discoverability (aim for 10+).');
    }

    if (seoScore < 50) {
      recs.push('Overall SEO needs improvement. Focus on title, description, and tags.');
    } else if (seoScore < 75) {
      recs.push('Good foundation. Minor improvements will boost SEO score.');
    }
  }

  return recs;
}

function renderResults(data, analytics) {
  document.getElementById('product-title').textContent = data.title || 'Not found';
  document.getElementById('product-price').textContent = data.price || 'Not found';
  document.getElementById('product-merchant').textContent = data.merchant || 'Not found';
  document.getElementById('product-breadcrumbs').textContent = data.breadcrumbs || 'Not found';
  document.getElementById('product-rating').textContent = data.rating || 'Not found';
  document.getElementById('product-reviews').textContent = data.reviewCount || 'Not found';

  const tagsContainer = document.getElementById('product-tags');
  if (data.tags && data.tags.length > 0) {
    tagsContainer.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  } else {
    tagsContainer.innerHTML = '<span class="no-data">No tags found</span>';
  }

  document.getElementById('word-count').textContent = analytics.wordCount;
  document.getElementById('title-length').textContent = analytics.titleLength;
  document.getElementById('tag-count').textContent = analytics.tagCount;

  const seoScoreEl = document.getElementById('seo-score');
  seoScoreEl.textContent = analytics.seoScore;
  seoScoreEl.className = 'metric-value';
  if (analytics.seoScore >= 75) seoScoreEl.classList.add('score-good');
  else if (analytics.seoScore >= 50) seoScoreEl.classList.add('score-medium');
  else seoScoreEl.classList.add('score-low');

  const keywordsEl = document.getElementById('top-keywords');
  if (analytics.keywords.length > 0) {
    keywordsEl.innerHTML = analytics.keywords
      .map(k => `<span class="keyword">${k.word} (${k.count})</span>`)
      .join('');
  } else {
    keywordsEl.innerHTML = '<span class="no-data">No keywords detected</span>';
  }

  const recsEl = document.getElementById('recommendations');
  recsEl.innerHTML = analytics.recommendations
    .map(rec => `<li>${rec}</li>`)
    .join('');
}
