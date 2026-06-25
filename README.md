# TextFlow Action Marketplace

Community-built actions for the [TextFlow](https://github.com/RishabhDotasara/TextFlow) browser extension.

> **TextFlow** lets you select text on any website and instantly trigger powerful actions — translate, summarize, rewrite, search, and more.

## 🚀 Available Actions

| Action | Description | SDKs Used |
|--------|-------------|-----------|
| **Translate** | Translate text to any language with HTML preservation | `ai`, `popup`, `input`, `spinner` |
| **Dictionary** | Look up definitions, synonyms, and usage examples | `ai`, `popup`, `spinner` |
| **Explain** | Break down complex text into simple language | `ai`, `popup`, `spinner` |
| **Summarize** | Condense text into concise summaries with key points | `ai`, `popup`, `spinner` |
| **Fix Grammar** | Fix grammar, spelling, and punctuation inline | `ai`, `dom`, `popup`, `spinner` |
| **Rewrite** | Rewrite text in Professional, Casual, Academic, or Creative tone | `ai`, `popup`, `input`, `spinner` |
| **Bullet Points** | Convert any text into organized bullet points | `ai`, `popup`, `spinner` |
| **Explain Code** | Get a detailed explanation of any code snippet | `ai`, `popup`, `spinner` |
| **Copy as Markdown** | Convert HTML to clean Markdown and copy to clipboard | `clipboard`, `popup`, `page` |
| **Read Aloud** | Read text aloud using the browser's speech engine | `page`, `popup` |
| **Word Count** | Count words, characters, sentences, paragraphs, reading time | `popup`, `page` |
| **Quick Search** | Search selected text on Google in a new tab | `browser` |
| **Share via Email** | Open an email draft with selected text and source URL | `browser`, `page` |
| **Highlight & Note** | Highlight text yellow and save it to your notes | `dom`, `notes`, `popup` |
| **JSON Prettify** | Format and prettify JSON data, copy to clipboard | `popup`, `clipboard` |
| **Dark Mode Toggle** | Toggle dark mode on any website via CSS inversion | `dom`, `storage`, `spinner` |

## 📦 How to Install an Action

1. Browse the actions above or visit the [marketplace website](https://rishabhdotasara.github.io/textflow-marketplace/)
2. Click on an action to view its page
3. Download the `action.json` file
4. Open the TextFlow dashboard → **Actions** tab → click **Import**
5. Select the downloaded JSON file — done!

## 🛠 How to Create Your Own Action

Actions are simple JavaScript scripts that run in a sandboxed environment with access to powerful SDKs.

### Action Structure

Each action is a folder inside `actions/` containing an `action.json`:

```json
{
    "id": "my-action",
    "name": "My Action",
    "description": "What this action does",
    "icon": "Zap",
    "capabilities": ["ai", "popup"],
    "author": "Your Name",
    "code": "// Your JavaScript code here"
}
```

### Available SDKs

Your action code has access to these SDK objects based on declared `capabilities`:

#### `selection` (always available)
```js
selection.text      // The selected text
selection.html      // The selected HTML
selection.pageUrl   // Current page URL
selection.pageTitle // Current page title
```

#### `ai` — AI / LLM Integration
```js
await ai.prompt(prompt, systemPrompt?)  // Send a prompt, get text back
await ai.chat(messages)                 // Multi-turn chat
await ai.json(prompt, systemPrompt?)    // Get structured JSON back
```

#### `popup` — Show Results to User
```js
await popup.show(text)        // Plain text popup
await popup.markdown(md)      // Render markdown
await popup.html(html)        // Render HTML
await popup.success(msg)      // Green success toast
await popup.error(msg)        // Red error toast
```

#### `input` — Get User Input
```js
await input.text(prompt, defaultValue?)        // Text input dialog
await input.confirm(message)                   // Yes/No confirmation
await input.select(prompt, options[])          // Dropdown selection
```

#### `clipboard` — Read/Write Clipboard
```js
await clipboard.write(text)   // Copy text to clipboard
await clipboard.read()        // Read from clipboard
```

#### `browser` — Browser Actions
```js
await browser.openTab(url)         // Open URL in new tab
await browser.openBackgroundTab(url) // Open in background
await browser.search(query)        // Google search
await browser.reload()             // Reload current tab
await browser.getCurrentTab()      // Get current tab info
await browser.copyCurrentUrl()     // Copy current URL
```

#### `dom` — Page Manipulation
```js
await dom.replaceSelection(text)              // Replace selected text
await dom.extractText(selector)               // Get text from CSS selector
await dom.extractHtml(selector)               // Get HTML from selector
await dom.replaceHtml(selector, html)         // Replace element HTML
await dom.highlightSelection(color)           // Highlight selection
await dom.typeInActiveElement(text)            // Type into focused element
await dom.injectCSS(css)                      // Inject custom CSS (returns ID)
await dom.removeCSS(id)                       // Remove injected CSS
await dom.getVisibleTextNodes(options?)        // Get visible text nodes
await dom.patchTextNodes(updates[])           // Batch update text nodes
```

#### `page` — Full Page Access
```js
await page.getText()            // Get all page text
await page.getHTML()            // Get page HTML
await page.getTitle()           // Get page title
await page.getURL()             // Get page URL
await page.execute(fn, ...args) // Execute function in page context
```

#### `notes` — Note Management
```js
await notes.create({ title, content, url })  // Create a note
await notes.get(id)                          // Get a note
await notes.list()                           // List all notes
await notes.update(id, updates)              // Update a note
await notes.delete(id)                       // Delete a note
```

#### `storage` — Persistent Key-Value Storage
```js
await storage.get(key)          // Get stored value
await storage.set(key, value)   // Store a value
await storage.delete(key)       // Delete a key
await storage.keys()            // List all keys
```

#### `http` — HTTP Requests
```js
await http.get(url)             // GET request
await http.post(url, body)      // POST request
await http.put(url, body)       // PUT request
await http.delete(url)          // DELETE request
```

#### `spinner` — Loading Indicator
```js
await spinner.show(text?)       // Show loading spinner
await spinner.hide()            // Hide spinner
await spinner.update(text)      // Update spinner text
```

#### `notify` — System Notifications
```js
await notify.info(msg)          // Info notification
await notify.success(msg)       // Success notification
await notify.warning(msg)       // Warning notification
await notify.error(msg)         // Error notification
```

### Icons

Use any icon name from [Lucide Icons](https://lucide.dev/icons). Popular choices:
`Zap`, `Search`, `Copy`, `FileText`, `Languages`, `Lightbulb`, `Check`, `Code`, `Moon`, `Mail`, `Hash`, `Save`, `Highlighter`, `RefreshCw`, `List`, `BookOpen`, `Braces`, `Volume2`

## 📤 Submit Your Action

1. Fork this repository
2. Create a new folder: `actions/your-action-name/`
3. Add an `action.json` with the structure shown above
4. Submit a Pull Request

Your action will be reviewed and added to the marketplace!

## 🏗 Development

```bash
# Install dependencies
npm install

# Build the actions index
node scripts/build-index.js

# Start local dev server
npm run dev

# Build for production
npm run build
```

## License

MIT
