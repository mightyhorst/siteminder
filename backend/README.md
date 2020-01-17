# SiteMinder API
This API uses [NestJs framework](https://nestjs.com/) which is basically ExpressJs with Typescript. 


### Quick start 

| command | description |
| ---                   | ---               |
| `yarn`                |  install          |
| `yarn run start:dev`  | run locally       |
| `yarn run start:docker`  | run using docker       |
| `yarn test`           | run all tests     |
| `yarn test:unit`      | run unit tests    |




### Deploy 
This uses Serverless Framework to deploy to AWS Lambda.

To deploy run this command :

```
sls deploy
```

To test offline run this command:

```
sls offline start
```

To fetch logs, once the lambda deployed, run:

```
sls logs -f main
```

