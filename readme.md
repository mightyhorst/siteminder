[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# SiteMinder API
This API uses [NestJs framework](https://nestjs.com/) which is basically ExpressJs with Typescript. 


| App | Link |
| --- | --- |
| `Swagger API` |  [https://app.swaggerhub.com/apis-docs/kitset-io/siteminder-api/1.0.1](https://app.swaggerhub.com/apis-docs/kitset-io/siteminder-api/1.0.1) | 
| `GraphQL API` | [to do](#) |


# Quick Start
| Endpoint | API |
| `POST email/send` | [https://7t4kmsmgj1.execute-api.us-east-1.amazonaws.com/dev/email/send](https://7t4kmsmgj1.execute-api.us-east-1.amazonaws.com/dev/email/send) |

```bash
curl --location --request POST 'https://7t4kmsmgj1.execute-api.us-east-1.amazonaws.com/dev/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
  "recipients": [
    {
      "email": "nickymitch@gmail.com",
      "name": "Nick Mitchell"
    }
  ],
  "header": "Header",
  "subHeader": "Sub Header",
  "body": "Hello world ",
  "imageUrl": "https://www.siteminder.com/wp-content/uploads/2020/01/home-page-hotel-tech-awards.png",
  "button": "Click me",
  "buttonUrl": "https://www.siteminder.com/",
  "subject": "Hello, World!",
  "sender": {
    "email": "nickymitch@gmail.com",
    "name": "Nick Mitchell"
  }
}'
```

### Development - Quick start 

| command                   | description |
| ---                       | ---               |
| `yarn`                    |  install          |
| `yarn run start:dev`      | run locally       |
| `yarn run start:docker`   | run using docker       |
| `yarn test`               | run all tests     |
| `yarn test:unit`          | run unit tests    |
| `yarn run deploy`         | deploys to AWS lambda    |




### Deploy 
This uses Serverless Framework to deploy to AWS Lambda.

| command                   | description |
| ---                       | ---               |
| `yarn run deploy`         | deploys to AWS lambda dev environment    |
| `yarn run deploy:offline` | to test this locally first    |


# Architecture 


# Todo 
A few best practice checklist to do 

### 0. Setup: Logs, Envs, Monorepo and Semantic commits
[ ] Setup monorepo properly - move off lerna and too lerna workspaces with noHoist https://yarnpkg.com/blog/2018/02/15/nohoist/ to properly share packages 
[ ] Logging with Winston as middleware  
[ ] Logging with AWS CloudWatch 
[ ] NestJs Exception Handling to capture custom exceptions and exceptions hierachy 
[x] Remove all .env files and secrets. Use AWS Secrets manager and CI environments 
[x] Use CircleCI environments and serverless secrets to set keys 
[ ] Use AWS Secrets manager 
[ ] Linting 
[ ] Coveralls.io - publish code coverage 
[x] Semantic commits with Commitizen
[x] Git hooks for quality control with Husky 
[ ] Semantic release in CICD

### 1. Project Structure Practices

[x] 1.1 Structure your solution by components

[x] 1.2 Layer your components, keep Express within its boundaries

[x] 1.3 Wrap common utilities as npm packages

[ ] 1.4 Separate Express 'app' and 'server' and http and https for local OIDC redirects (out of scope)

[x] 1.5 Use environment aware, secure and hierarchical config

### 2. Error Handling Practices

[x] 2.1 Use Async-Await or promises for async error handling

[x] 2.2 Use only the built-in Error object

[ ] 2.3 Distinguish operational vs programmer errors

[x] 2.4 Handle errors centrally, not within an Express middleware

[x] 2.5 Document API errors using Swagger or GraphQL

[x] 2.6 Exit the process gracefully when a stranger comes to town

[x] 2.7 Use a mature logger to increase error visibility

[x] 2.8 Jest - Test error flows using your favorite test framework

[ ] 2.9 Discover errors and downtime using APM products

[x] 2.10 Catch unhandled promise rejections

[x] 2.11 Fail fast, validate arguments using a dedicated library

### 3. Code Style Practices

[ ] 3.1 Use ESLint

[ ] 3.2 Node.js specific plugins

[x] 3.3 Start a Codeblock's Curly Braces on the Same Line

[x] 3.4 Separate your statements properly

[x] 3.5 Name your functions

[x] 3.6 Use naming conventions for variables, constants, functions and classes

[x] 3.7 Prefer const over let. Ditch the var

[x] 3.8 Require modules first, not inside functions

[x] Nest must import files directly - 3.9 Require modules by folders, opposed to the files directly

[x] 3.10 Use the `===` operator

[x] 3.11 Use Async Await, avoid callbacks

[x] 3.12 Use arrow function expressions (=>)

### 4. Testing And Overall Quality Practices

[x] 4.1 At the very least, write API (component) testing

[x] use Jest - 4.2 Include 3 parts in each test name

[x] use Jest - 4.3 Structure tests by the AAA pattern

[x] 4.4 Detect code issues with a linter

[x] use Jest - 4.5 Avoid global test fixtures and seeds, add data per-test

[x] 4.6 Constantly inspect for vulnerable dependencies

[ ] 4.7 Tag your tests esp. for identofying smoke tests 

[x] 4.8 Check your test coverage, it helps to identify wrong test patterns

[x] 4.9 Inspect for outdated packages

[x] 4.10 Use production-like env for e2e testing

[x] 4.11 Refactor regularly using static analysis tools

[x] 4.12 Use CircleCI 

### 5. Going To Production Practices

[ ] 5.1. Monitoring! with Prometheus, OpenZipkin tracing 

[x] 5.2. Increase transparency using smart logging

[ ] 5.3. Delegate anything possible (e.g. gzip, SSL) to a reverse proxy

[x] 5.4. Lock dependencies

[ ] 5.5. Guard process uptime using the right tool

[x] 5.6. Utilize all CPU cores

[x] 5.7. Create a ‘maintenance endpoint’

[x] 5.8. Discover errors and downtime using APM products

[x] 5.9. Make your code production-ready

[ ] 5.10. Measure and guard the memory usage

[x] 5.11. Get your frontend assets out of Node

[ ] 5.12. Be stateless, kill your servers almost every day

[x] 5.13. Use tools that automatically detect vulnerabilities

[ ] 5.14. Assign a transaction id to each log statement

[x] 5.15. Set NODE_ENV=production

[ ] 5.16. Design automated, atomic and zero-downtime deployments

[ ] 5.17. Use an LTS release of Node.js

[ ] 5.18. Don't route logs within the app

### 6. Security Best Practices

[x] 6.1. Embrace linter security rules

[x] 6.2. Limit concurrent requests using a middleware

[x] 6.3 Extract secrets from config files or use packages to encrypt them

[x] 6.4. Prevent query injection vulnerabilities with ORM/ODM libraries

[ ] 6.5. Collection of generic security best practices

[x] 6.6. Adjust the HTTP response headers for enhanced security

[x] 6.7. Constantly and automatically inspect for vulnerable dependencies

[x] 6.8. Avoid using the Node.js crypto library for handling passwords, use Bcrypt

[ ] 6.9. Escape HTML, JS and CSS output

[x] 6.10. Validate incoming JSON schemas

[ ] 6.11. Support blacklisting JWTs

[ ] 6.12. Prevent brute-force attacks against authorization

[x] 6.13. Run Node.js as non-root user

[x] 6.14. Limit payload size using a reverse-proxy or a middleware

[ ] 6.15. Avoid JavaScript eval statements

[ ] 6.16. Prevent evil RegEx from overloading your single thread execution

[x] 6.17. Avoid module loading using a variable

[ ] 6.18. Run unsafe code in a sandbox

[ ] 6.19. Take extra care when working with child processes

[x] 6.20. Hide error details from clients

[x] 6.21. Configure 2FA for npm or Yarn

[ ] Not neccessary - 6.22. Modify session middleware settings

[ ] 6.23. Avoid DOS attacks by explicitly setting when a process should crash

[ ] No neccessary - 6.24. Prevent unsafe redirects

[x] 6.25. Avoid publishing secrets to the npm registry

### 7. Performance Best Practices / Opinions 

[x] 7.1. Opinion - Prefer native JS methods over user-land utils like Lodash (redundant as using rxjs)

[ ] 7.2. Use Fastify in place of Express
