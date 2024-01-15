# **Northcoders backend API**

## **About**

This is an API built for the purpose of accessing application data programmatically.

## **Instructions for running the program locally:**

### **Clone the repository**

In order to see the backend API, you can fork and clone the repository using the git clone command in your terminal. This should be run in the directory where you want to save it.

```JavaScript
git clone https://github.com/JoravarSinghPunia/NC-GAMES-API
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

### **If all tests pass, the API is ready to be deployed.**

**Node & PSQL versions**

_The version of Node used to run this project is 20.10.0_

_The version of PSQL used to manage the data is 16.1_
