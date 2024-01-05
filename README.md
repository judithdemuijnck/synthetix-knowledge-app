This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This is an unoffical web application to demo basic capabilities of the Synthetix Knowledge API.

## Installation

You will need to have a package manager like npm or yarn installed.

### Installing dependencies

To install all dependencies, open this directory in a new shell and run the command
`$ npm install`

### Setting up environmental variables

In the root directory, you will need to create a .env.local file with the following environmental variables:

```
NEXT_PUBLIC_APPLICATIONKEY={your application key}
NEXT_PUBLIC_CONSUMERKEY={your consumer key}
NEXT_PUBLIC_BASE_URL=https://api{environment}.synthetix.com/2.0/external/
```

You can obtain your application and consumer key from your account manager.
Beware that these are public environmental variables that will be explicitly embedded during build time. Your keys will be exposed if you share this application externally.

### Run the application

To start the application, open this directory in a new shell and run the command
`$ npm run dev`

The application will be served from [http://localhost:3000](http://localhost:3000) by default.

## Using Synthetix Knowledge API

### Creating a session
