# WeRent Project
WeRent is an application aimed at simplifying and improving the process of renting clothes. WeRent is designed for individuals looking to rent clothes, including young professionals, fashion students, social media influencers, event planners, and travelers. The platform caters to users who value transparency, reliability, and ease of use in the clothing rental process.

### Problem Statement
WeRent addresses issues such as complex user flows, unreliable product quality, inaccurate product descriptions, and difficulties in assessing the condition of rental items. 

### Goals
By implementing a user-friendly review page, WeRent enhances transparency and user trust, allowing potential renters to make informed decisions based on the feedback and experiences of previous users.

## Folder Structure
 ```
 |-- WeRent/
 |   ├── Docker/                   # Docker configurations for containerization, images, etc.
 |   ├── prisma/                   # Prisma ORM Configuration & Migrations
 |   ├── src/                      # Source Code Directory
 |       └── assets                # Documentation files (e.g., screenshot images)
 |       └── authentication/       # Components related to app authentication.
 |       └── likes/                # Components related to likes pages
 |       └── prisma/               # Prisma ORM configurations specific to src
 |       └── product/              # Components related to Product pages
 |       └── rating/               # Components related to product rating pages
 |       └── reviews/              # Components related to review pages
 |       └── user_product/         # Components related to user-product interactions pages
 |       └── we-rent_test/         # Test files specific to the WeRent application
 |       └── app.controller.ts     # Controller logic for handling HTTP requests
 |       └── app.module.ts         # NestJS module where components are imported
 |       └── app.service.ts        # Service layer for business logic
 |       └── main.ts               # Bootstrap file, entry point of the application
 |   ├── test/                     # Test directory for query logics and main code
 |-- README.md                     # Readme file containing project documentation
 |-- example.env                   # Example environment variables file
```

## Installation
1. Clone the repository
```bash
git clone <repository_url>
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
<h2 align="center"> PostgreSQL ERD</h2><img src="https://github.com/amandasatya/WeRent/blob/03-table-review-dev/src/assets/WeRent%20ERD.png?raw=true">




<h2 align="center">Dockerhub Images</h2><img src="https://github.com/amandasatya/WeRent/blob/main/src/assets/Dockerhub%20Images.jpg?raw=true">


<h2 align="center">AWS CLI</h2><img src="https://github.com/amandasatya/WeRent/blob/main/src/assets/AWS%20CLI.jpg?raw=true">


## API Reference

#### User Registration
```http
  POST /auth/register
```
| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `username` | `string` | **Required & Unique**.     |
| `email`    | `string` | **Required & Unique**.     |
| `password` | `string` | **Required & Unique**.     |

#### User Login
```http
  POST /auth/login?email
```
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `email`    | `string` | **Required & Unique**.            |
| `password` | `string` | **Required & Unique**.            |

#### Create A New Product Data
```http
  POST /product
```
|     Parameter      |      Type      |              Description                |
|:-------------------|:---------------| :-------------------------------------- |
| `product_name`     | `string`       | **Required**.                           |
| `product_desc`     | `string`       | **Required**.                           |
| `sizes`            | `array[string]`| **Required**. **["S", "M", "L", "XL"]** |
| `prices`           | `number`       | **Required**.                           |
| `product_pictures` | `string`       | **Optional**. **Max File Size = 2MB**   |
| `product_videos`   | `string`       | **Optional**. **Max File Size = 5MB**   |

#### Add Product Picture using ID Product
```http
  PATCH /product/productID/upload-picture
```
| Parameter          | Type     | Description                           |
| :------------------| :------- | :------------------------------------ |
| `product_pictures` | `string` | **Optional**. **Max File Size = 2MB** |

#### Add Product Video using ID Product
```http
  PATCH /product/productID/upload-video
```
| Parameter        | Type     | Description                           |
| :----------------| :------- | :------------------------------------ |
| `product_videos` | `string` | **Optional**. **Max File Size = 5MB** |

#### Get All Product Data List
```http
  GET /product
```

#### Get All Product Data List with Product ID
```http
  GET /product/:productID
```

#### Update A Product Data using Product ID (Update a Specific Fields in Product Table using Product ID)
```http
  PATCH /product/productID
```
|     Parameter      |      Type      |              Description                |
|:-------------------|:---------------| :-------------------------------------- |
| `product_name`     | `string`       | **Required**.                           |
| `product_desc`     | `string`       | **Required**.                           |
| `sizes`            | `array[string]`| **Required**. **["S", "M", "L", "XL"]** |
| `prices`           | `number`       | **Required**.                           |

#### Delete Product Picture using ID Product
```http
  DELETE /product/:productID/delete-picture
```

#### Delete Product Video using ID Product
```http
  DELETE /product/:productID/delete-video
```

#### Delete A Product Data using Product ID
```http
  DELETE /product/:productID
```



#### Create A New Review for Product Data
```http
  POST /reviews
```
| Parameter         | Type            | Description                                |
| :-----------------| :---------------| :----------------------------------------- |
| `product_id`      | `number`        | **Required**.                              |
| `user_id`         | `number`        | **Required**.                              |
| `description`     | `string`        | **Optional**.                              |
| `fit_scale`       | `string [enum]` | **Optional**. **["Small", "Fit", "Large"]**|
| `review_pictures` | `string`        | **Optional**. **Max File Size = 2MB**      |
| `review_video`    | `string`        | **Optional**. **Max File Size = 5MB**      |

#### Add Review Picture using ID Review
```http
  PATCH /reviews/reviewID/upload-picture
```
| Parameter         | Type     | Description                           |
| :---------------- | :------- | :------------------------------------ |
| `review_pictures` | `string` | **Optional**. **Max File Size = 2MB** |

#### Add Product Video using ID Product
```http
  PATCH /review/reviewID/upload-video
```
| Parameter       | Type     | Description                           |
| :---------------| :------- | :--------------------------------     |
| `review_videos` | `string` | **Optional**. **Max File Size = 5MB** |

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
| Parameter     | Type            | Description                                |
| :------------ | :---------------| :------------------------------------------|
| `product_id`  | `number`        | **Required**.                              |
| `user_id`     | `number`        | **Required**.                              |
| `description` | `string`        | **Optional**.                              |
| `fit_scale`   | `string [enum]` | **Optional**. **["Small", "Fit", "Large"]**|

#### Delete A Review Data using Review ID
```http
  DELETE /reviewsID/:reviewsID
```

#### Delete Review Picture using ID Review
```http
  DELETE /reviews/:reviewsID/delete-picture
```

#### Delete Product Video using ID Review
```http
  DELETE /reviews/:reviewsID/delete-video
```



#### Create Rating Data for Product
```http
  POST /rating/add
```
| Parameter     | Type     | Description                       |
| :--------     | :------- | :-------------------------------- |
| `userId`      | `number` | **Required**                      |
| `productId`   | `number` | **Required**                      |
| `ratingValue` | `number` | **Required (Min = 1, Max = 5)**   |

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
| Parameter   | Type     | Description                       |
| :--------   | :------- | :-------------------------------- |
| `user_id`   | `number` | **Required**                      |
| `review_id` | `number` | **Required**                      |

#### Get Like Count for Review Data using Review ID
```http
  GET /likes/review/reviewID
```

#### Get Like Count for Review Data using User ID
```http
  GET /likes/review/reviewID
```