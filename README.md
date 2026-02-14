## MERN Backend (Express + MongoDB)

An ecommerce backend built with Express and MongoDB. It follows a layered structure (routes -> controllers -> services -> models) and includes authentication, role-based access, product management, orders, and payment integrations.

## What this project does

- Exposes REST APIs for auth, users, products, and orders.
- Handles JWT-based authentication with cookie or Bearer token support.
- Enforces role-based authorization for admin/merchant/user flows.
- Manages file uploads (product images) with Cloudinary.
- Supports payments via Khalti, Stripe, and cash.
- Sends password reset emails.

## Tech stack and where it is used

- Express: API server and routing in src/app.js and src/routes/*.js
- Mongoose: data models and DB access in src/models/*.js and src/services/*.js
- JWT: auth token creation and validation in src/utils/jwt.js
- bcryptjs: password hashing and comparison in src/services/authService.js
- Multer: in-memory file handling for product images in src/app.js
- Cloudinary: image upload in src/config/cloudinary.js and src/utils/file.js
- Resend: email delivery in src/utils/email.js
- Stripe: payment intent creation in src/utils/payment.js
- Axios: HTTP calls to Khalti in src/utils/payment.js
- dotenv: environment configuration in src/config/config.js

## Visual project structure

```
Backend/
	package.json
	README.md
	vercel.json
	api/
	src/
		app.js
		config/
			cloudinary.js
			config.js
			database.js
		constants/
			orderStatuses.js
			paymentMethod.js
			paymentStatus.js
			prompt.js
			roles.js
		controllers/
			authController.js
			orderController.js
			productController.js
			userController.js
		middlewares/
			auth.js
			logger.js
			roleBasedAuth.js
		models/
			Order.js
			Payment.js
			Product.js
			ResetPassword.js
			User.js
		routes/
			authRoute.js
			orderRoutes.js
			productRoute.js
			userRoute.js
		services/
			authService.js
			orderService.js
			productService.js
			userService.js
		utils/
			email.js
			file.js
			gemini.js
			jwt.js
			payment.js
```

## Architecture overview (what runs where)

- src/app.js: application bootstrap, middleware setup, and route mounting.
- src/routes: URL-to-controller wiring for each domain.
- src/controllers: request validation and HTTP responses (thin handlers).
- src/services: business logic and database orchestration.
- src/models: Mongoose schemas for Users, Products, Orders, Payments, ResetPassword.
- src/middlewares: auth, role-based access, and request logging.
- src/utils: cross-cutting helpers (jwt, file uploads, email, payments, gemini).
- src/config: environment config, database, Cloudinary setup.

## Features by route

- Auth
	- Register, login, logout
	- Forgot and reset password with email link
- Users
	- Admin-managed user CRUD
	- Profile image upload
	- Merchant order access
- Products
	- List, filter, and fetch by ID
	- Create, update, delete (merchant role)
	- Image upload via Cloudinary
- Orders
	- User and merchant order views
	- Admin order management
	- Payment flows (Khalti, Stripe, cash)

## What I learn by building this project

- Structure a production-style Express backend
- JWT authentication and secure token handling
- Role-based authorization patterns
- Mongoose data modeling and service-layer logic
- Integrating third-party services (payments, email, file storage)
- Handling multipart file uploads
- Designing REST APIs with clean separation of concerns

## Environment variables

Create a .env file at the project root:

```
APP_URL=
PORT=5000
NAME=
VERSION=0.0.1
MONGODB_URL=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

KHALTI_API_KEY=
KHALTI_API_URL=
KHALTI_RETRUN_URL=

EMAIL_API_KEY=

GEMINI_API_KEY=
GEMINI_URL=

STRIPE_SECRET_KEY=
```


## Quick start
1) npm install
2) npm run dev

The server runs on PORT and exposes APIs under /api.
