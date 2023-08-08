# tally-frontend

react native front end app for tally application

## pre-req

- npm version is v9.5.1, node version is v18.16.1

## setup

1. Check your npm version is `9.5.1` by running `npm --version`.
2. Check your node version is `18.16.1` by running `node --version`.
   1. You can install the correct node version using any node package manager. For example, download `nvm` [here](https://github.com/nvm-sh/nvm/blob/master/README.md). Then run `nvm install 18.16.1`. Finally, make sure to set the node version if necessary with `nvm use 18.16.1`
   2. If you are using a different manager, make sure to set the correct version (ex. `nodenv local 18.16.1`).
3. If you're running android:
   1. Download `Android Studio`
   2. Create a `local.properties` file within `android` and set `sdk.dir` variable [according to this StackOverflow answer](https://stackoverflow.com/a/48155800).
3. Run `npm install`

## commands

- `npm run start`: start app
- `npm run android`: start android app
  - Make sure you have an emulator running (Android Studio > AVD > Select play on a device)
- `npm run ios`: start ios app
- `npm run web`: start web app

## local dev with server

To run with the server, make sure you have tally-backend setup and running (`npm run start-dev`). The server needs to be up and running 
prior to making API calls.