# LTSstack

> A modern stack consisting of Lambda, Turbolinks & StimulusJS. Also containig Typescript &
> Tailwaind. :man_shrugging:

## Installation

Install the dependencies & _hydrate_ the Lambda functions, which are managed by [Architect](https://arc.codes).

```sh
$ npm install
$ npx arc hydrate
```

## Running the dev-server

Start the dev-server & visit [localhost:3333/](http://localhost:3333/) in your browser.

```sh
$ npm start
```

## Writing tests

Tests are run by [Jest](https://jestjs.io) and there are two types of them: those for StimulusJS
components, executed in a JSDOM env, and those for the Lambda handlers, executed in a Node env.

### Testing StimulusJS components

These tests leverage the [`@testing-library/dom`](https://npm.im/@testing-library/dom) and render
the accompanying HTML into the JSDOM. Have a look at
[`assets/javascript/__tests__/guestbook-form-controller.test.ts`](assets/javascript/__tests__/guestbook-form-controller.test.ts)
to get an idea.

### Testing Lambda handler

These tests simply call the handler function with an example request object and check the returned
result. Have a look at [`server/http/get-index/test.ts`](server/http/get-index/test.ts) to get an
idea.

## The idea

&lt;tbd&gt;
