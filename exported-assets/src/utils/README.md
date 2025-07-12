# Language Pack Module

## Overview

The Language Pack Module (`languagePack.js`) provides a professional, extensible internationalization system for the Advanced Sports Betting Analyzer application. It supports multiple languages with English as the default, stores the selected language in localStorage, and can be easily extended with new languages.

## Features

- **Multi-language Support**: Currently supports English (en), Hungarian (hu), and German (de)
- **Automatic Language Persistence**: Selected language is stored in localStorage
- **Easy Extension**: Simple API to add new languages
- **Fallback System**: Falls back to English if a translation is missing
- **Dynamic Updates**: Automatically updates all UI elements when language changes
- **Professional Structure**: Well-organized with JSDoc comments

## Usage

### Basic Usage

```javascript
// Get text in current language
const text = window.languagePack.getText('title');

// Change language
window.languagePack.applyLanguage('hu');

// Get current language
const currentLang = window.languagePack.getCurrentLanguage();
```

### Adding a New Language

```javascript
// Add a new language (e.g., Spanish)
const spanishTranslations = {
    // Header
    title: 'Analizador de Apuestas Deportivas Avanzado',
    subtitle: 'Análisis Profesional Multi-Deportivo con IA',
    
    // Navigation
    navTips: 'Consejos de Apuestas',
    navCalculator: 'Calculadora',
    navPortfolio: 'Portafolio',
    navMath: 'Matemáticas',
    navSettings: 'Configuración',
    
    // Language Selector
    languageLabel: 'Idioma:',
    languageEn: 'Inglés',
    languageHu: 'Húngaro',
    languageDe: 'Alemán',
    
    // Add all other translations...
};

// Add the language to the pack
window.languagePack.addLanguage('es', spanishTranslations);
```

### Language Structure

Each language object should contain translations for all keys used in the application. The structure follows this pattern:

```javascript
{
    // Header
    title: 'Application Title',
    subtitle: 'Application Subtitle',
    
    // Navigation
    navTips: 'Tips',
    navCalculator: 'Calculator',
    navPortfolio: 'Portfolio',
    navMath: 'Mathematics',
    navSettings: 'Settings',
    
    // Language Selector
    languageLabel: 'Language:',
    languageEn: 'English',
    languageHu: 'Hungarian',
    languageDe: 'German',
    
    // Section Titles
    tipsTitle: 'Betting Tips',
    calculatorTitle: 'Calculator',
    portfolioTitle: 'Portfolio',
    mathTitle: 'Mathematics',
    
    // Form Elements
    calculatorBetAmount: 'Bet Amount ($)',
    calculatorOdds: 'Odds',
    calculatorProbability: 'Probability (%)',
    calculatorCalculate: 'Calculate',
    
    // Notifications
    notificationTipAdded: 'Tip added to portfolio',
    notificationTipRemoved: 'Tip removed from portfolio',
    
    // Errors
    errorInvalidInput: 'Invalid input',
    errorCalculationFailed: 'Calculation failed',
    
    // General
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close'
}
```

## API Reference

### Methods

#### `getText(key)`
Returns the translated text for the given key in the current language.

**Parameters:**
- `key` (string): The translation key

**Returns:**
- `string`: The translated text, or the key itself if translation not found

#### `applyLanguage(languageCode)`
Changes the application language and updates all UI elements.

**Parameters:**
- `languageCode` (string): The language code (e.g., 'en', 'hu', 'de')

#### `getCurrentLanguage()`
Returns the current language code.

**Returns:**
- `string`: The current language code

#### `getAvailableLanguages()`
Returns an array of available language codes.

**Returns:**
- `string[]`: Array of available language codes

#### `isLanguageSupported(languageCode)`
Checks if a language is supported.

**Parameters:**
- `languageCode` (string): The language code to check

**Returns:**
- `boolean`: True if language is supported

#### `addLanguage(languageCode, translations)`
Adds a new language to the pack.

**Parameters:**
- `languageCode` (string): The language code
- `translations` (object): The translations object

#### `updateAllTexts()`
Updates all text elements in the application to the current language.

## Events

The module dispatches a custom event when the language changes:

```javascript
window.addEventListener('languageChanged', (event) => {
    console.log('Language changed to:', event.detail.language);
});
```

## Integration

The language pack is automatically loaded when the HTML file loads the module script:

```html
<script src="src/utils/languagePack.js"></script>
```

The module creates a global instance at `window.languagePack` that can be used throughout the application.

## Best Practices

1. **Always provide English translations** as they serve as the fallback
2. **Use consistent key naming** (camelCase is recommended)
3. **Group related translations** with comments
4. **Test all languages** when adding new features
5. **Keep translations concise** but clear
6. **Use placeholders** for dynamic content when needed

## File Structure

```
src/
└── utils/
    ├── languagePack.js    # Main language pack module
    └── README.md         # This documentation
```

## Contributing

To add a new language:

1. Create the translations object following the existing structure
2. Add the language using `addLanguage()`
3. Update this README with the new language
4. Test the language thoroughly
5. Ensure all UI elements are properly translated

## License

This module is part of the Advanced Sports Betting Analyzer project. 