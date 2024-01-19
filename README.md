# **Backend News API**

## **Links**

You can access the live version of this API [here](https://backend-news-api-rzxs.onrender.com/api).

To explore the endpoints in further detail, you can refer to the [endpoints.json](/endpoints.json) file

## **About**

The backend news API is a service built for the purpose of accessing application data programmatically. Modelled after real world backend services, such as Reddit, this api will deliver information to the front end architecture. The project uses [PSQL](https://www.postgresql.org/) to setup the database of articles, and HTTP endpoints using [express](https://expressjs.com/). This is now live and being hosted on [ElephantSQL](https://www.elephantsql.com/) with deployment on [Render](https://render.com/).

This api was completed using **Test Driven Development (TDD)** principles, with use of both **Jest** and **Supertest**. Each endpoint was created with its own ticket, with **frequent code reviews from Senior Software Engineers.**

## **Instructions for running the program locally:**

### **Clone the repository**

In order to see the backend API, you can fork and clone the repository using the git clone command in your terminal. This should be run in the directory where you want to save it.

```JavaScript
git clone https://github.com/JoravarSinghPunia/BACKEND-NEWS-API.git
```

Note: Forking the repository will require you to use the link provided from the forked repo.

### **Install dependencies**

This project uses various dependencies in order to run. Failure to install these dependencies will result in the server producing errors. Install all dependencies by running the following commands in your VSCode integrated terminal within the repo.

```JavaScript
npm install
```

Note: If you get vulnerabilities, follow the instruction given on the terminal. Use the following command to fix this:

```JavaScript
npm audit fix
```

### **Set up databases and seed**

As you can see inside the package.json, we have a list of scripts that you are going to run:

### **Set up the databases**

```JavaScript
npm run setup-dbs
```

### **Create dotenv files**

You will need to create two .env files:

.env.test and .env.development

Into each, add PGDATABASE=database_name with the correct database name for that environment (see /db/setup.sql for the database names).

### **Run the tests**

Run the utils.test.js to see if they are passing and get ready to seed the database.

```JavaScript
npm test utils
```

Note: The test will pass and the repo should be clean and working. If any tests fail, then you will have to debug the utils function.

### **Seed the database**

Now it is time to seed the database, run the following script to do this:

```JavaScript
npm run seed
```

This will seed you database and create tables with their records.

## **Test endpoints**

Once seeded, you can test the endpoints. To do so, run this command:

```JavaScript
npm test app
```

## **Endpoints**

Below is a list of all valid endpoints:

| Endpoints                                   | Description                                                                           |
| :------------------------------------------ | :------------------------------------------------------------------------------------ |
| **GET** /api                                | Serves up a json representation of all the available endpoints of the api             |
| **GET** /api/topics                         | Serves an array of all topics                                                         |
| **GET** /api/users                          | Serves an array of objects containing username, name and avatar_url                   |
| **GET** /api/articles                       | serves an array of all articles                                                       |
| **GET** /api/articles/:article_id           | Serves an article object by article id                                                |
| **GET** /api/articles/:article_id/comments  | Serves an array of comments for given article_id requested with the most recent first |
| **POST** /api/articles/:article_id/comments | Adds comment to comment database and serves the added comment                         |
| **PATCH** /api/articles/:article_id         | Updates article with new vote by article ID                                           |
| **DELETE** /api/comments/:comment_id        | Deletes the comment by comment_id                                                     |

### **If all tests pass, the API is ready to be deployed.**

**Node & PSQL versions**

_The version of Node used to run this project is 20.10.0_

_The version of PSQL used to manage the data is 16.1_
