# e-tickets app

## Description

This project is a web app for working with simple e-tickets (six-digit numbers).

An app has such features:
* authenticate by email and password
* issue a new ticket (add an existing ticket or generate a new one)
* find the ticket by it's number
* see an info about the ticket
* mark the ticket as used
* delete the ticket
* get the sequence of unique tickets chosen randomly from
the list of issued tickets (as for the lottery)

## Tech stack

* React (TypeScript)
* effector
* Firebase

## Requirements

You need the Firebase project with such features enabled:
* Email/Password authentication method (with some pre-created
users - there's no sign up feature at the moment)
* Firestore (with `tickets` collection - see the document
structure in `./src/api/tickets/tickets.ts`)

## How to run

1. Install `Node.js` (≥ 15.13.0)
2. Install `yarn` npm package globally
3. Run `cp .env.template .env && cp .firebaserc.template .firebaserc`
4. Fill in `.env` file with correct Firebase credentials
5. Fill in `projects.default` field of `.firebaserc` file
with correct Firebase project name
6. Run `yarn` to install dependencies
7. Run `yarn start` to run the app in development mode

## How to deploy the app to Firebase

1. Do steps 1-6 from the previous section
2. Run `yarn build` to create the production build
3. Install `firebase-tools` npm package globally
4. Run `firebase login` to login to Firebase
5. Run `firebase deploy` to deploy the app to Firebase
