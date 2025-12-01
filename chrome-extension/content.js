(() => {
  const extractProductData = () => {
    const data = {
      title: '',
      price: '',
      merchant: '',
      breadcrumbs: '',
      tags: [],
      reviewCount: '',
      rating: '',
      description: '',
      imageUrl: ''
    };

    try {
      const titleEl = document.querySelector('h1[itemprop="name"]') ||
                      document.querySelector('h1.product-title') ||
                      document.querySelector('[data-testid="product-title"]') ||
                      document.querySelector('h1');
      data.title = titleEl ? titleEl.textContent.trim() : '';

      const priceEl = document.querySelector('[itemprop="price"]') ||
                      document.querySelector('.price') ||
                      document.querySelector('[data-testid="price"]') ||
                      document.querySelector('.product-price');
      data.price = priceEl ? priceEl.textContent.trim() : '';

      const merchantEl = document.querySelector('[itemprop="brand"]') ||
                        document.querySelector('.designer-name') ||
                        document.querySelector('[data-testid="designer-name"]') ||
                        document.querySelector('a[href*="/store/"]');
      data.merchant = merchantEl ? merchantEl.textContent.trim() : '';

      const breadcrumbEl = document.querySelector('nav[aria-label="breadcrumb"]') ||
                          document.querySelector('.breadcrumbs') ||
                          document.querySelector('[data-testid="breadcrumbs"]');
      if (breadcrumbEl) {
        const links = breadcrumbEl.querySelectorAll('a');
        data.breadcrumbs = Array.from(links).map(l => l.textContent.trim()).join(' > ');
      }

      const tagElements = document.querySelectorAll('.product-tags a, .tags a, [data-testid="product-tag"]');
      data.tags = Array.from(tagElements).map(tag => tag.textContent.trim()).filter(t => t);

      const reviewCountEl = document.querySelector('[itemprop="reviewCount"]') ||
                           document.querySelector('.review-count') ||
                           document.querySelector('[data-testid="review-count"]');
      data.reviewCount = reviewCountEl ? reviewCountEl.textContent.trim() : '';

      const ratingEl = document.querySelector('[itemprop="ratingValue"]') ||
                      document.querySelector('.rating-value') ||
                      document.querySelector('[data-testid="rating-value"]');
      data.rating = ratingEl ? ratingEl.textContent.trim() : '';

      const descEl = document.querySelector('[itemprop="description"]') ||
                    document.querySelector('.product-description') ||
                    document.querySelector('[data-testid="product-description"]') ||
                    document.querySelector('.description');
      data.description = descEl ? descEl.textContent.trim() : '';

      const imgEl = document.querySelector('[itemprop="image"]') ||
                   document.querySelector('.product-image img') ||
                   document.querySelector('img[alt*="product"]') ||
                   document.querySelector('main img');
      data.imageUrl = imgEl ? (imgEl.src || imgEl.dataset.src || '') : '';

    } catch (error) {
      console.error('Scraping error:', error);
    }

    return data;
  };

  return extractProductData();
})();
