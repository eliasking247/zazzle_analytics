# Text Analysis Chrome Extension

A Chrome extension that analyzes visible text content from web pages and displays word frequency statistics.

## Features

- Extracts visible text from the active tab
- Counts total words
- Shows the top 5 most frequent words
- Clean, modern UI with instant analysis

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `chrome-extension` folder from this repository

## Usage

1. Navigate to any webpage
2. Click the extension icon in your Chrome toolbar
3. The analysis runs automatically and displays results instantly

## Files Structure

```
chrome-extension/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js           # Analysis logic and popup behavior
├── content.js         # Text extraction script
├── styles.css         # Styling for the popup
└── icon*.png          # Extension icons
```

## Permissions

- `activeTab`: Access to the current active tab
- `scripting`: Execute scripts to extract page content

## Development

The extension uses:
- Manifest V3
- Vanilla JavaScript
- No external dependencies
- Local text analysis (no API calls)

## License

MIT
