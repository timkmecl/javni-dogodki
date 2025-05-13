# Javni Dogodki (Public Events)

This project is a web application that displays public events fetched from the Slovenian e-uprava portal. Users can search, filter, and view details of upcoming events.

## Features

*   Fetches and displays a list of public events.
*   Search functionality for event name, city, location, or organizer.
*   Filter events by:
    *   Location (city or region)
    *   Date (today, tomorrow, this week, this month, or all)
*   Provides a direct link to the event details on the e-uprava portal.
*   Provides a Google Maps link for the event location.
*   Shows the number of days until the event.
*   Loading and error states for a better user experience.

## Technologies Used

*   React
*   Vite
*   Cheerio (for parsing HTML content from the API)

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd events
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run preview`: Serves the production build locally for preview.
*   `npm run deploy`: Deploys the application to GitHub Pages.

## Deployment

The application is configured to be deployed to GitHub Pages.
The live version can be accessed at: [https://timkmecl.github.io/javni-dogodki](https://timkmecl.github.io/javni-dogodki)

To deploy the application, run:
```bash
npm run deploy
```
This command first builds the project and then deploys the `dist` folder to the `gh-pages` branch.
