## MERN Stack E-commerce Website

## Notes:

## In Package.json

-In type in package.json "module" for import statement and "commonjs" for require

## Folder Structure

root/

- package.json
- .env
- .env.example
- .gitignore
- node_modules/
- src/
  - app.js
  - config/
    - config.js
  - constants/
    - roles.js
  - controllers/
    - userControllers.js
  - helpers/
    - dataFormatter.js
  - lib/
    - userType.js
  - models/
    - User.js
  - routes/
    - userRoutes.js
  - services/
    - userServices.js
  - utils/
    - jwtAuth.js

## Installation

npm i init -y for default package.json
npm i express for express
npm i .dotenv for packages of dotenv
npm i -D nodemon for easy restart of server and the -D refers to dev dependencies (dependencies only needed in development phase)
npm i body-parser for parsing the data
npm i mongoose for ODM (Object data Mapper/Model)
npm i bcryptjs for Authentication though node js has its encryption crypto we will use Bcryptjs package for password encryption ( Authentication )
npm i jsonwebtoken for JWT( JSON Web Token )

## JSON data

- JavaScript Object Notation
- Text based Structured data
- Most common format used in APIs
- JSON to JS Object --> JSON.parse()
- JS Object to JSON --> JSON.stringify()

## Rest API

- Representational State Transfer
  - JSON based data
  - HTTP Methods
- Application Program Interface

## DRY Technique while coding means Don't Repeat yourself

## Layered Architecture

1.Presentation Layer (Frontend)
2.API Layer (Routes/Controller) - Routes: URL Endpoint - Controller: Function that handles HTTP request, responses, status code. DUMB function. No Computational
3.Business Logic Layer (Services) - Service: Function that handles pure business logic, computation. - Service: methods/function can communicate with each other.
4.Data Access Layer (Models/Repositories) - Models and Repositories - Schema in MERN STACK - Sql

## Import/export

Export from one and Import form another.

## Request Object

- params
- query
- body
- file

## Logging

## MongoDB

- Non-relational Database
- Data are stored in collections & documents
- Collection: Table
- Document: Rows
- Field: Column

## MongoDB Tools

1. shell - Terminal
2. Compass - Local GUI
3. Atas - Cloud

## MongoDB Shell commands

1. mongosh: Init mongodb
2. show dbs: Show database list
3. use <dbName>: Use a database
4. cls: clear screen
5. show collections: Show list of collections(table)

## Create

1. insertOne

- db.<collectionName>.insertOne()
- for eg: db.products.insertOne({name:"Iphone 14", price: 1800})

2. insertMany

- db.<collectionName>.insertMany()
- for eg: db.products.insertMany([])

## Read

1. find

- db.<collectionName>.find()
- db.products.find()
- db.products.find({category:"Monitor"})

2. FindOne

- db.<collectionName>.findOne()
- db.products.findOne({name: "Iphone 14"})

3. countDocument

- db.products.countDocuments()

## Update

1. updateOne

- db.<collectionName>.updateOne({find},{$set:{updated value}})
- db.products.updateOne({name: "Iphone 14"}, {$set: {name: "Iphone 14 pro max"}})

## Delete

1. deleteOne

- db.<collectionName>.deleteOne({find})
- db.products.deleteOne({name: "Iphone 14 pro max"})

## Complex Filter

1. $ep: equality Operator

- db.products.find ({category:{$eq:"Monitors"}})

2. $ne: Not equal Operator

- db.products.find ({category:{$ne:"Monitors"}})

3. $gt/$gte: greater than/greater than or equal to

- db.products.find ({price:{$gt:"3000"}})
- db.products.find ({price:{$gte:"3000"}})

4. $lt/$lte: greater than/greater than or equal to

- db.products.find ({price:{$lt:"3000"}})
- db.products.find ({price:{$lte:"3000"}})

5. $in

- db.products.find ({price: {$in: [3000,2500] }})

6. $and

- db.products.find ($and: [{ price: 2000 },{ category: "Cosmetics" }])

7. $or

- db.products.find ($or: [{ price: 2000 },{ category: "Monitor" }])

6. $not

- db.products.find ({category: {$not: {$eq: "Monitors" } }})

## Sorting

- db.products.find().sort({price: 1})
- for ascending price: 1
- for descending price: -1

## Limit

- db.products.find().limit(2)

## Skip

- db.products.find().Skip(2)

## Mongoose

- ODM(Object data Mapper/Model) for MongoDB for Node.js
- Schema Validation
- Models
- Middlewares
- Relationships

## Schema

- Structure/rule or rule of a Document/data

## Model

- class built from schema, interact with the database.
- Semantics: Always singular, pascal case (for eg Product, ProductOrder etc)

## Important pattern

- First create Schema in models folder
- then create service in Service folder that should content all the computational
- then create Controller for dumb function that redirects to service and adding try catch
- then create route and exporting that function
- then adding that in app.js main file with app.use("route",userRoutes)

## Encryption

- Converting normal readable text into cipher(unreadable) text.
- for e.g. hello => awd9awd29d\*adj

## Decryption

- Converting text cipher(unreadable) into normal readable text.
- for e.g. awd9awd29d\*adj => hello

## Types :

1. Symmetric : Same key is user for Encryption and Decryption for e.g. AES
2. Asymmetric : Different key is user for Encryption and Decryption. for example Private key,public key - for more see RSA Algorithm

## Hashing

- Type of Encryption, this is one way Encryption

- while Register : Test123456 => diwdjadjhawdifjawdifhawif (store)
- while login : Test123456 => diwdjadjhawdifjawdifhawif (compare)

## Salt

- Adding random texts in the hash value

## Auth Process

1. Login success
2. Token generated - JWT
3. Store Token - Cookie, session Storage, Local Storage
4. Append this token in every requests to handle auth

## JWT - JSON web Token

- Used for Auth generally
- Self verified
- temper-proof

### JWT Structure

1. Header
2. Payload
3. Signature

## Cookie

- It can be store in both Browser and Service.
- Size - 4KB
- Expiry data can be set
- if any data is stored in cookies than it is available in every tab of Browser

## Session Storage

- Can be stored only in Browser
- Size - 5mb
- Expires on tab Close
- Available in one tab

## Local Storage

- Can be stored only in Browser
- Size: 5mb - 10mb depending upon Browser
- Never expires ( If we want to expire than we have to Delete )
- Available in every tabs

## Middleware

- Function that sits between request and response.

  Browser ----- Request --------> Server
  Middleware
  Server ----- Response --------> Browser

- Middleware is the function that has the accessibility of both request and response Object.
- It has the functionality to go to next() function call

## Usages

- logging
- Authentication & Authorization
- Error handling
- Modify request data

## Authentication and Authorization

- Authentication: Is user logged in/available?
- Authorization: Is user allowed to do something

## Role based access Control ( RBAC )

- Single type role: Access Hierarchy
- Multiple Roles:
  1. User ---> order.
  2. MERCHANT ---> Product Management.
  3. ADMIN ---> Product Management, User management, order Management.

## Product Order

1. User id
2. Order items
   a.Product id
   b.Product quantity
3. status
4. orderNumber
5. totalPrice
6. shippingAddress

## File Upload

1. Data/File input : Body -> Form data --Process--> Muter
2. Temporary storage : /uploads --> Buffer (Binary data)
3. storage bucket : Upload to Cloudinary --> file path/url
4. set the File path/url: use this file path or url to store url

# Payment

1. payment Method use (for eg pay via Khalti)
2. update payment status in our system

## Khalti

1.  Payment initial -> generate url using the input data
2.  Payment occurs in the Khalti portal
3.  Redirects to your return url after completion

## Reset Password

1. user request on forgot password
2. sends an email to that user,with a reset-password link and token
3. Also store this token in db
4. Requests for reset password
5. Includes new password, confirm password with token
6. update the password

# Semantics

- Code readability
- Code formatting
- File and Folder Structure
- File and Folder Naming

  - For js
    -Folder Name : -Camel Case or Kebab Case
    -File Name : Camel Case
  - For Html and Css: Kebab Case

  - File and function naming in JS
    -Always use Noun
    -For variable use Noun
    -For Function/method Verb
    -Check for singular / Plural
    -Routes should be kebab-case with all Lowercase texts
    -Add lines and below if-else , loop, Function call

# Debugging

- Process of Finding errors
- Steps to debug Code in node js :
  1. Check the root app.js
  2. Check the Routes (Check spelling, route orders)
  3. Check the Controllers (Check spelling, Check params, arguments)
  4. Check the Service (Check spelling, Check params, arguments)

# AI Integration
- Gemini

# Multi vendor system
- Every merchant should be able to fetch:
    1. List of products created by them
    2. Orders made on their product
They should be able to update/delete their product.

