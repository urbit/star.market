# Star Market
https://star.market

## Dev Setup

1. [Download Ganache](https://www.trufflesuite.com/ganache) and start a local ethereum network on port 8545 (the default).
2. Ensure you have the latest version of [the stardust repo](https://github.com/willbach/stardust/tree/local-dev) in an adjacent folder (same parent directory as this repo).
3. Go to the `stardust` repo and run `npm i && npm run deploy-dev`.
4. Come back to this repo and run `yarn && yarn start`.
5. Log in to Metamask or Brave Crypto Wallet, connect to the local Ganache network (port 8545), and add a new account using the private key from the second Ganache account. It will be the same account as the one that deployed the contracts in step 3 and so will have less ETH than the other accounts.
6. Reload the webpage. You should see that your account has 2 stars and 0 DUST.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so the same scripts apply.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.