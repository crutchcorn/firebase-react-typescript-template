# Firebase React Typescript Template 

This template is a monorepo for a Firebase project that integrates React for hosting, Firebase Functions, and TypeScript (for both React and Functions).
It supports linting and formatting all of the projects from the root level, integrates things like Husky and Lint-Staged out-of-the-box and contains pre-existing mocks for Jest testing the client.

Speaking of the client, an early version of auth is implemented and ready-to-roll. It includes a login screen, a "protect this route" component (with fallback options), and more.

You're additionally able to open each of these folders in an IDE individually in order to get complete auto-suggested results for things like paths. Each of the projects has the linting configured to read from the root level and expand upon it.

This template is meant to speed up development of a React Firebase project by providing all of the defaults a user might need.

## Setup

You'll need to be running on Node 10 to get this repository running properly. It's the latest version of Node supported by Firebase Functions and as such that is the limiting factor to the Node version supported here.

To install packages for the client, base route, and functions, simply run:

`yarn`

Because we're utilizing [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/), we're able to manage all of the project's libraries from the root level.

You may also want to have the firebase cli installed globally:

`npm i -g firebase-tools`

After installing the tools, you'll need to login to your Firebase account:

`firebase login`

Finally, you'll need to dictate which of the projects you want to track:

`firebase use <project-id-here>`

## Usable with Firebase

Because we follow a standard folder path, you're able to utilize the full functionality set of the Firebase CLI. These tools include:

- [View Firebase logs](https://firebase.google.com/docs/functions/writing-and-viewing-logs)
- [Configure environmental variables for Firebase Functions](https://firebase.google.com/docs/functions/config-env)
- [Test Firebase Functions locally](https://firebase.google.com/docs/functions/local-shell)
- [Deploying various parts of Firebase, often independently](https://firebase.google.com/docs/hosting/deploying)
- [Any other interaction through the Firebase CLI](https://firebase.google.com/docs/cli)
