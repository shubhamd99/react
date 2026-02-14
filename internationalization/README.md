# React Internationalization with i18next

This project demonstrates a comprehensive implementation of internationalization (i18n) in a React application using `react-i18next`. It covers basic to advanced scenarios, including dynamic formatting, pluralization, and backend loading.

## Features

- **Multi-language Support**: English, Spanish, and Hindi.
- **Dynamic Formatting**:
  - **Dates**: Uses `moment.js` and `Intl.DateTimeFormat`.
  - **Numbers/Currency**: dynamic currency symbols (USD, EUR, INR) based on the current language.
- **Pluralization**: Handles singular and plural forms automatically.
- **Context-based Translations**: Different translations based on context (e.g., gender).
- **Lazy Loading**: Translations are loaded asynchronously from the backend (`/public/locales`).
- **Language Detection**: Automatically detects the user's browser language.

## Project Structure

- `src/i18n.js`: Core configuration for `i18next`, including plugins and formatting logic.
- `public/locales/{lang}/translation.json`: Translation files for each language.
- `src/components/LanguageSwitcher.jsx`: Component to toggle languages.
- `src/examples/`: Modular components demonstrating each i18n feature.

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Explore the App**:
    - Use the **Language Switcher** to change languages.
    - Observe how dates, times, and currencies update automatically.
    - Check the **Network tab** to see translation files being loaded on demand.

## Dependencies

- `react` / `react-dom`
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`
- `i18next-http-backend`
- `moment`
