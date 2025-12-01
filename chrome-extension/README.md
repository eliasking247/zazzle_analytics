# Zazzle Product Analyzer

A Chrome extension that provides instant SEO and analytics insights for Zazzle product pages.

## Features

- **Automatic Analysis**: Opens and analyzes products instantly when you click the extension icon
- **Product Data Extraction**: Scrapes title, price, merchant, category, tags, ratings, and reviews
- **SEO Scoring**: Calculates an SEO strength score based on multiple factors
- **Keyword Analysis**: Extracts and ranks the most frequently used keywords
- **Smart Recommendations**: Provides actionable suggestions to improve product listings
- **Clean UI**: Modern, card-based interface with intuitive data visualization

## Installation

### Option 1: Load Unpacked (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `chrome-extension` folder
6. The extension is now installed and ready to use

### Option 2: Chrome Web Store (When Published)

1. Visit the Chrome Web Store listing
2. Click "Add to Chrome"
3. Confirm the installation

## Usage

1. Navigate to any Zazzle product page (e.g., `https://www.zazzle.com/...`)
2. Click the extension icon in your Chrome toolbar
3. The extension will automatically analyze the page and display:
   - Product information
   - Analytics metrics
   - SEO recommendations

## How It Works

### Data Extraction
The extension uses DOM scraping to extract product data directly from the page, including:
- Product title and price
- Merchant/designer name
- Category breadcrumbs
- Product tags
- Review count and rating
- Product description
- Main product image

### Analytics Engine
After extraction, the extension performs:
- Word count analysis of the description
- Keyword frequency detection
- Title length optimization check
- Tag count evaluation
- Overall SEO score calculation (0-100)

### SEO Scoring
The SEO score is calculated based on:
- **Title Length** (25 points): Optimal range 30-80 characters
- **Description Length** (25 points): Best if 100+ words
- **Tag Count** (20 points): Ideal if 10+ tags
- **Completeness** (30 points): Having description, price, and merchant info

## Developer Notes

### File Structure
```
chrome-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Main UI structure
├── popup.js            # Analytics engine and UI logic
├── content.js          # DOM scraping script
├── styles.css          # UI styling
├── icon16.png          # Extension icon (16x16)
├── icon48.png          # Extension icon (48x48)
├── icon128.png         # Extension icon (128x128)
└── README.md           # Documentation
```

### Key Technologies
- **Manifest V3**: Latest Chrome extension standard
- **Content Scripts**: For DOM access and data extraction
- **Chrome Scripting API**: For dynamic script injection
- **Vanilla JavaScript**: No external dependencies

### Permissions
- `activeTab`: Access to the current tab's content
- `scripting`: Ability to inject content scripts
- `host_permissions`: Limited to zazzle.com domain

## Chrome Web Store Packaging

To prepare the extension for Chrome Web Store submission:

1. Remove or update the `README.md` (optional for store submission)
2. Ensure all icons are properly sized (16x16, 48x48, 128x128)
3. Create a ZIP file of the entire `chrome-extension` folder:
   ```bash
   cd chrome-extension
   zip -r ../zazzle-analyzer.zip .
   ```
4. Upload the ZIP file to the Chrome Web Store Developer Dashboard
5. Complete the store listing with:
   - Description
   - Screenshots
   - Privacy policy (if collecting data)
   - Category selection

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT send data to external servers
- Does NOT track browsing history
- Only activates on Zazzle product pages
- Processes all data locally in the browser

## License

MIT License - Feel free to modify and distribute

## Support

For issues or feature requests, please open an issue on the GitHub repository.
