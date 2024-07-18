# WeRent Project
WeRent is an application aimed at simplifying and improving the process of renting clothes. WeRent is designed for individuals looking to rent clothes, including young professionals, fashion students, social media influencers, event planners, and travelers. The platform caters to users who value transparency, reliability, and ease of use in the clothing rental process.

### Problem Statement
WeRent addresses issues such as complex user flows, unreliable product quality, inaccurate product descriptions, and difficulties in assessing the condition of rental items. 

### Goals
By implementing a user-friendly review page, WeRent enhances transparency and user trust, allowing potential renters to make informed decisions based on the feedback and experiences of previous users.

## Installation
1. Clone the repository
```bash
git clone https://github.com/amandasatya/WeRent.git
```
2. Install Project Dependencies
```bash
$ npm install
```

3. Set up Prisma
   - Install the Prisma CLI as a development dependency:
     ```bash
     $ npm install -D prisma
     ```
   - Initialize Prisma inside your Project:
       ```bash
       $ npx prisma init
       ```

4. Set environment variable:
   - Localhost:
     ```bash
     DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgres"
     JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
     ```
    
   - Deployment:
     
      ```bash
       DATABASE_URL="postgresql://postgres:12345678@database-1.c9oac4qi0j3d.ap-southeast-1.rds.amazonaws.com:5432/postgres"
       JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
       AWS_ACCESS_KEY_ID =your-id
       AWS_SECRET_ACCESS_KEY= your-secret-access-key
       AWS_BUCKET_NAME=YOUR-AWS-BUCKET-NAMES
       ```
    
## Usage/Examples
### Running the App:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Prisma Schema
 - Migrate the database
    ```bash
    $ npx prisma migrate dev --name init
    ```
 - Generate the database
     ```bash
     $ npx prisma generate
     ```

## Features
- SQL Database = PostgreSQL
- Postman API Documentation


## Documentation
<p align="center"> **PostgreSQL ERD** </p><img src="https://github.com/amandasatya/WeRent/blob/main/src/assets/WeRent%20ERD.png?raw=true">

<p align="center"> **Dockerhub Images** </p><img src="https://github.com/amandasatya/WeRent/blob/main/src/assets/Dockerhub%20Images.jpg?raw=true">


## API Reference

#### User Registration
```http
  POST /auth/register
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required & Unique**. |
| `email` | `string` | **Required & Unique**. |
| `password` | `string` | **Required & Unique**. |

#### User Login
```http
  POST /auth/login?email
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required & Unique**. |
| `password` | `string` | **Required & Unique**. |

#### Create A New Product Data
```http
  POST /product
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_name` | `string` | **Required**. |
| `product_desc` | `string` | **Required**. |
| `sizes` | `array[string]` | **Required**. **["S", "M", "L", "XL"]** |
| `prices` | `number` | **Required**. |
| `product_pictures` | `string` | **Required**. |
| `product_video` | `string` | **Required**. |

#### Get All Product Data List
```http
  GET /product
```

#### Get All Product Data List with Product ID
```http
  GET /product/:productID
```

#### Update A Product Data using Product ID
```http
  PATCH /product/productID
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_name` | `string` | **Required**. |
| `product_desc` | `string` | **Required**. |
| `sizes` | `array[string]` | **Required**. **["S", "M", "L", "XL"]** |
| `prices` | `number` | **Required**. |
| `product_pictures` | `string` | **Required**. |
| `product_video` | `string` | **Required**. |

#### Delete A Product Data using Product ID
```http
  DELETE /product/:productID
```

#### Create A New Review for Product Data
```http
  POST /reviews
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_id` | `number` | **Required**. |
| `user_id` | `number` | **Required**. |
| `description` | `string` | **Optional**. |
| `fit_scale` | `string [enum]` | **Optional**. **["Small", "Fit", "Large"]**|

#### Get All Review Data List
```http
  GET /reviews
```

#### Get All Review Data List with Review ID
```http
  GET /reviews/:reviewsID
```

#### Update Review Data for Review Data using Review ID
```http
  PUT /reviews/reviewsID
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_id` | `number` | **Required**. |
| `user_id` | `number` | **Required**. |
| `description` | `string` | **Optional**. |
| `fit_scale` | `string [enum]` | **Optional**. **["Small", "Fit", "Large"]**|


#### Delete A Product Data using Product ID
```http
  DELETE /reviewsID/:reviewsID
```

#### Create Rating Data for Product
```http
  POST /rating/add
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `number` | **Required** |
| `productId` | `number` | **Required** |
| `ratingValue` | `number` | **Required (Min = 1, Max = 5)** |

#### Get Product Rating using Product ID
```http
  GET /rating/product/productID
```

#### Get Product Rating Average Data using Product ID
```http
  GET /rating/product/productID/average
```

#### Create Like for Review Data
```http
  POST /likes
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `number` | **Required** |
| `review_id` | `number` | **Required** |

#### Get Like Count for Review Data using Review ID
```http
  GET /likes/review/reviewID
```

#### Get Like Count for Review Data using User ID
```http
  GET /likes/review/reviewID
```



