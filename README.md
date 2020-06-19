<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Explanation
When the api is called to save the data, it first validates for the data and if the data is invalid, it sends validation error messages as response. To enable validations, a middleware needs to be created like this "app.useGlobalPipes(new ValidateInputPipe())". If the data is valid, it starts further processing and sends to the controller which sends to service. A file is checked, if it doesn't exist it is created with a header and data is saved. If the file already exists, data is appended to it. The response is sent as success(true or false) depending on the success or failure of the operation.
To get the list of data, another api is called with a 'get' request and it returns the data or error depending upon the response. Since promises are used, the response is either a resolved or rejected one. Rejected responses are not sent automatically, they need to be caught before being sent. So a new middleware is created called anyExceptionFilter to send the response in case of rejection.

## Packages
### Csv parser and Csv writer
Like their name suggests, they are used to read from and write to csv respectively. Csv writer comes with modes to write a new file every time or append to the existing one. Unfortunately, when appending headers are not available in the csv file.

### Class validator
It is used for api validation of the requests. It contains useful validators ranging from checking empty to enum validator and checking strings.

## CI/CD Pipeline
### Wercker
It is a continuous delivery platform that runs all the scripts listed in your local wercker.yml code. You can place any scripts you want to run after the code is pushed to github and it runs everything. With the help of this, builds and testing processes and other processes can be automated.
Steps:
1. Go to the wercker website and set up your account. Click on the new application on the dashboard and add your code repo. Github is an option among others. Select the intended repository and it prompts you to add the wercker.yml file to your local code and push it to git if your code lacks it. You can choose your project type to generate a yml file dynamically. For javascript projects, choose nodejs.
2. You are done. Once you push the code on git, the wercker runs automated tasks.

## Code Quality Check
### Codeclimate
Codeclimate checks your code for various malpractices including duplicates, complexity and the standard. Once your repo is run through code climate, it gives you a result with "smelly codes", duplicate ones with a maintainability index. You can choose between various filters to check the problem areas in your code.

## Deployment with heroku
If you have the heroku cli, you can repeat the following steps to deploy.
1. Go to your project folder and open a terminal. Create a file with the name Procfile and add the command you want to execute when the app starts. Our command will be "web: npm run start:prod" which tells us when a process named web starts run the given command. Commit the file.
2. Change the "ts-node" dev dependency to dependency because during heroku deployment, devDependencies are not installed and you need ts-node for compiling ts and module resolution.
3. Run "heroku create". It creates a remote url and origin for heroku just like a git. 
4. Now you just have to push the code to the origin which is heroku in our case. The command is "git push heroku master"
5. You are done.
6. If you want to rename your app(because heroku gives a random name to your app), you can use "heroku apps: rename NEWNAME" from the project folder.

## License

  Nest is [MIT licensed](LICENSE).
