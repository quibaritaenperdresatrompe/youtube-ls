This project allows to categorize Youtube channels from your Youtube account and registered user playlists.

1. Browse the **[YoutubeLS online version](https://youtube-ls.netlify.com/)** or your [local version](###start).
2. Authenticate with your Google Acount to authorize the application. Learn more about [authentification](#Authorization) and [privacy](#privacy).
3. Start to organize your channel subscriptions and browse registered and organized channels.

## Available Scripts

In the project directory, you can run:

### `start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

n.b. You will need to provide the required environment variables in a `.env` file :

- `REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID` cf. [Authentification](#authentification) section ;
- `REACT_APP_YOUTUBE_DATA_API_KEY` cf. [Ressources](#ressources) section ;

### `test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `commit`

Run the [`git-cz`](https://github.com/streamich/git-cz) CLI to generate consitent git commit messages.

It respects [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification).

## Authentification

The application use **Google Sign-In OAuth 2.0** and require an **OAuth client ID**.

It could be provided by setting the environment variable `REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID`.

> Learn more on [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/OAuth2UserAgent).

## Ressources

The application use **Youtube Data API v3** and require an **API key**.

It could be provided by setting the environment variable `REACT_APP_YOUTUBE_DATA_API_KEY`.

> Learn more on [Obtaining authorization credentials
> ](https://developers.google.com/youtube/registering_an_application).

## Privacy

The app need to access details from your Google and Youtube accounts.

It reads the [`GoogleUser` object from Google Sign-In API](https://developers.google.com/identity/sign-in/web/reference#googleusergetid) and the [`Subscriptions: list` ressource from Youtube Data API](https://developers.google.com/youtube/v3/docs/subscriptions/list).

It stores associations between :

- Youtube account and Youtube channels ;
- Youtube channels and categories ;

## Deployment

This project apply [Continuous Deployment approach with Netlify](https://www.netlify.com/docs/continuous-deployment/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/6f2245a6-9bb5-4098-bba1-608c9d0e2acc/deploy-status)](https://app.netlify.com/sites/youtube-ls/deploys)

n.b. You will need to provide the required environment variables via [Netlify Envirionment Variables](https://www.netlify.com/docs/continuous-deployment/#environment-variables) :

- `REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID` cf. [Authentification](#authentification) section ;
- `REACT_APP_YOUTUBE_DATA_API_KEY` cf. [Ressources](#ressources) section ;
