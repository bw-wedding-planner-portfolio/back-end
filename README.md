# Wedding Planner Portfolio

## Table of Contents

- [Dummy Data](#dummy-data)      
- [Auth Routes](#auth-routes)
  * [Register](#register)    
  * [Login](#login)    
- [User Routes](#user-routes)
  * [Get Users](#get-users)
- [Posts Routes](#posts-routes)
  * [Create Post](#create-post)    
  * [Get Posts](#get-posts)    
  * [Get Posts By Id](#get-posts-1)    
  * [Update Post](#update-post)    
  * [Delete Post](#delete-post)

## API Documentation

```
API link:
https://weddingportfolio.herokuapp.com/
```

### Dummy Data

```
user: [
  {
        "firstName": "John",
        "lastName": "Doe",
        "username": "JohnDoe",
        "password": "password",
        "city": "Austin",
        "state": "Texas",
        "phoneNumber": "652-549-8558",
        "email": "johndoe@gmail.com",
        "pricing": "$$$ - Moderate"
  }
]
```
```
posts: [
  {
         "firstName": "John",
         "lastName": "Doe",
         "id": 2,
         "theme": "Romantic",
         "location": "Atlanta, Georgia",
         "description": "Alex and Jessica's Wedding",
         "image": "https://image.cnbcfm.com/api/v1/image/105562387-1546624827001preview1.png?v=1546624853&w=678&h=381",
         "vendors": "David Wright Cakes & Catoring",
         "planner_id": 2
 }
]
```

# Auth Routes
| Table | Method |       Endpoint |                      Description |
| ----- | :----: | -------------: | -------------------------------: |
| users |  POST  | /auth/register |            Registers a new user. |
| users |  POST  | /auth/login    | Logs in already registered user. |

## Register

### Registers a new user.

_Method URL:_ `/auth/register`

_HTTP Method:_ **[POST]**

#### Request Body 
| Name         |  Type  | Required |     Description |
| ---------    | :----: | -------: | --------------: |
| `firstName` | String |      Yes |                 |
| `lastName`  | String |      Yes |                 |
| `username`   | String |      Yes | Must be unique. |
| `password`   | String |      Yes |                 |
| `city`   | String |      Yes |                 |
| `state`   | String |      Yes |                 |
| `phoneNumber`   | String |      No |                 |
| `email`      | String |      Yes | Must be unique |
| `pricing`      | String |      No |                 |

#### Examples

```
{
  "firstName": "First Name",
  "lastName": "Last Name",
  "username": "uniquetest",
  "password": "password",
  "email": "planner@email.com",
  "city": "Seattle",
  "state": "WA",
  "pricing": "$$-Affordable"
}

```

#### Response

##### 201 (Created)

> If you successfully register a user, the endpoint will return an HTTP response with a status code `201`.

##### 400 (Bad Request)

> If you are missing a username or password, the endpoint will return an HTTP response with a status code of `400`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

## Login

### Logs in an already registered user.

_Method URL:_ `/auth/login`

_HTTP Method:_ **[POST]**

#### Request Body

| Name       |  Type  |                                                Description |
| ---------- | :----: | ---------------------------------------------------------: |
| `username` | String |                           Must match username in database. |
| `password` | String | Must match password to corresponding username in database. |

#### Example

```
{
  "username": "JohnDoe",
  "password": "password"
}
```

#### Response


##### 200 (OK)

> If you successfully log in, the endpoint will return an HTTP response with a status code `200`.

##### 400 (Bad Request)

> If you are missing a username or a password, the endpoint will return an HTTP response with a status code of `400`.

##### 401 (Unauthorized)

> If you provide invalid credentials, the endpoint will return an HTTP response with a status code of `401`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

# User Routes

## Get Users

### Gets a list of users. **Must be done to get ID to use throughout the site** 

_Method URL:_ `/auth/user/`

_HTTP Method:_ **[GET]**

#### Headers

| Name            |  Type  | Required |              Description |
| --------------- | :----: | -------: | -----------------------: |
| `Content-Type`  | String |      Yes | Must be application/JSON |
| `Authorization` | String |      Yes |           JSON Web Token |

#### Example

```
{
  "id": 1
  "firstName": "First Name",
  "lastName": "Last Name",
  "username": "uniquetest",
  "password": "password",
  "email": "planner@email.com",
  "city": "Seattle",
  "state": "WA",
  "pricing": "$$-Affordable"
}

```

#### Response

##### 200 (OK)

> If users are found, the endpoint will return an HTTP response with a status code `200`.

##### 404 (Not Found)

> If users are not found, the endpoint will return an HTTP response with a status code `404`.

##### 401 (Unauthorized)

> If user does not have access, the endpoint will return an HTTP response with a status code of `401`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

# Posts Routes

## Create Post

### Creates a post with a theme, location, description, image, and vendors.

_Method URL:_ `/auth/user/:id/posts`

_HTTP Method:_ **[POST]**

#### Headers

| Name            |  Type  | Required |              Description |
| --------------- | :----: | -------: | -----------------------: |
| `Content-Type`  | String |      Yes | Must be application/JSON |
| `Authorization` | String |      Yes |           JSON Web Token |

#### Body

| Name             |  Type   | Required | Description |
| ---------------- | :-----: | -------: | ----------: |
| `theme`      | String  |      Yes |             |
| `location`          | String  |      Yes |             |
| `description`          | String  |      Yes |             |
| `image`      | String  |      Yes |             |
| `vendors`    | String  |      Yes |             |


#### Response

##### 201 (Created)

> If post is created, the endpoint will return an HTTP response with a status code `201`.

##### 400 (Bad Request)

> If you are missing any post information, the endpoint will return an HTTP response with a status code of `400`.

##### 401 (Unauthorized)

> If user does not have access, the endpoint will return an HTTP response with a status code of `401`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

## Get Posts

### Gets a list of ALL posts.

_Method URL:_ `/weddingposts`

_HTTP Method:_ **[GET]**

#### Headers

No headers needed. `/weddingposts` is not a protected path.

#### Response

##### 200 (OK)

> If posts are found, the endpoint will return an HTTP response with a status code `200`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

## Get Posts

### Gets ALL posts by ID.

_Method URL:_ `/weddingposts/:id`

_HTTP Method:_ **[GET]**

#### Headers

No headers needed. `/weddingposts/:id` is not a protected path.

#### Response

##### 200 (OK)

> If post with specified ID is found, the endpoint will return an HTTP response with a status code `200`.

##### 404 (Not Found)

> If post with specified ID is not found, the endpoint will return an HTTP response with a status code `404`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

## Get Events

#### _Method Url:_ `/auth/user/:id/posts`

##### HTTP method: [GET]

## **Need user ID to get users' post **

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
{
    "id": 2,
    "description": "Alex and Jessica's Wedding",
    "location": "NY",
    "theme": "Outdoor",
    "vendors": "",
    "image": "http://example.jpg:8733",
    "pricing": "$$$ - Moderate",
    "firstName": "John",
    "lastName": "Doe"
}

```


## Update Post

### Updates users' post by ID.

_Method URL:_ `/auth/user/:id/post/:pid`

## **Need user ID to update users' post **
_HTTP Method:_ **[PUT]**

#### Headers

| Name            |  Type  | Required |              Description |
| --------------- | :----: | -------: | -----------------------: |
| `Content-Type`  | String |      Yes | Must be application/JSON |
| `Authorization` | String |      Yes |           JSON Web Token |

#### Body

| Name             |  Type   | Required | Description |
| ---------------- | :-----: | -------: | ----------: |
| `theme`      | String  |      Yes |             |
| `location`          | String  |      Yes |             |
| `description`          | String  |      Yes |             |
| `image`      | String  |      Yes |             |
| `vendors`    | String  |      Yes |             |


#### Response

##### 200 (OK)

> If post with specified ID is found and updated, the endpoint will return an HTTP response with a status code `200`.

##### 404 (Not Found)

> If post with specified ID is not found and updated, the endpoint will return an HTTP response with a status code `404`.

##### 401 (Unauthorized)

> If user does not have access, the endpoint will return an HTTP response with a status code of `401`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.

## Delete Post

### Deletes users' post by ID.

_Method URL:_ `/auth/user/:id/post/:pid`

## **Need user ID to delete users' post **

_HTTP Method:_ **[DELETE]**

#### Headers

| Name            |  Type  | Required |              Description |
| --------------- | :----: | -------: | -----------------------: |
| `Content-Type`  | String |      Yes | Must be application/JSON |
| `Authorization` | String |      Yes |           JSON Web Token |

#### Response

##### 200 (OK)

> If post with specified ID is found and deleted, the endpoint will return an HTTP response with a status code `200`.

##### 404 (Not Found)

> If post with specified ID is not found and deleted, the endpoint will return an HTTP response with a status code `404`.

##### 401 (Unauthorized)

> If user does not have access, the endpoint will return an HTTP response with a status code of `401`.

##### 500 (Internal Service Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code of `500`.
