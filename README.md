# Blog App Backend 
#### Backend server for Blog Rendering Application created with Node.js<br>

## Introduction

A simple backend server for Blog Rendering Application created with Node.js and using Database(MongoDB) for storing Data. 
The server accepts Images for blogs and stores them Cloudinary[cloud-based image and video management service] or local storage based upon the mode specified by User. 
Backend Server supports API calls for Adding, Updating, Fetching and Deleting Blogs.

## Technologies / Dependencies

* [Node.js  v14.17.4](https://nodejs.org/en/)
* [express  v4.17.1](https://www.npmjs.com/package/express)
* [mongoose  v6.0.0](https://www.npmjs.com/package/mongoose)
* [uniqid  v5.3.0](https://www.npmjs.com/package/uniqid)
* [multer  v1.4.3](https://www.npmjs.com/package/multer)
* [cloudinary  v1.26.3](https://www.npmjs.com/package/cloudinary)
* [datauri  v4.1.0](https://www.npmjs.com/package/datauri)
* [dotenv  v10.0.0](https://www.npmjs.com/package/dotenv)

## Getting Started

These are instructions to set up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

To clone and run this application, you'll need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) (which comes with npm) installed on your computer.


### Installation

From your command line:

1. Clone the repo
   ```sh
   $ git clone https://github.com/Saima422/Blog-Backend.git
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```

3. Before starting the application set Config Variables in the 'config.env' file. A sample 'config.env' is provided in the Github repo. <br>
The server is by default set to the 'cloudinary' mode. To change the mode for storing the images, edit the IMAGE_SAVE_MODE = 'local' in 'config.env' file. 

4. Run the app
   ```JS
   $ npm run start
   ```


## Endpoints
### 1. GET all Blogs's

Returns json data containing objects of each Blog.

* **URL**

	`/blogs`

* **Method:**

	`GET`

*  **URL Params**

	**Required:**

	`None`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**

  ```sh
  {
    "message": "Fetched a Random Blog",
    "data": [{
        "_id": "612eb12ab5214e75108e29a7",
        "blogId": "c2de3amkt0nt6om",
        "author": "saima sayed",
        "createdAt": "6:01:3 17/08/2021",
        "updatedAt": "",
        "blogTitle": "Blog 1",
        "blogContent": "Blog Content 1",
        "blogImage": "http://res.cloudinary.com/samm/image/upload/v1630449962/hy1qp1qd8mkvgi1axbrr.jpg",
        "blogImageId": "hy1qp1qd8mkvgi1axbrr",
        "tags": [
            "travel"
        ],
        "relatedLinks": [],
    }]
  }
  ```

* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/get_blogs.png)


### 2. GET Blog by ID

Returns json data containing objects of Blog ID provided.

* **URL**

	`/blogs/blogId`

* **Method:**

	`GET`

*  **URL Params**

	**Required:**

	`taskId =  [String]`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "Fetched a Random Blog",
    "data": {
        "_id": "612eb12ab5214e75108e29a7",
        "blogId": "c2de3amkt0nt6om",
        "author": "saima sayed",
        "createdAt": "6:01:3 17/08/2021",
        "updatedAt": "",
        "blogTitle": "Blog 1",
        "blogContent": "Blog Content 1",
        "blogImage": "http://res.cloudinary.com/samm/image/upload/v1630449962/hy1qp1qd8mkvgi1axbrr.jpg",
        "blogImageId": "hy1qp1qd8mkvgi1axbrr",
        "tags": [
            "travel"
        ],
        "relatedLinks": [],
    }
  }
  ```

* **Error Response:**

  **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Blog with ID Not Found",
    "error": "Invalid Request"
}`


* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/blog_id.png)


### 2. GET a Random Blog 

Returns json data containing object of a Random Blog.

* **URL**

	`/random`

* **Method:**

	`GET`

*  **URL Params**

	**Required:**

	`None`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "Fetched a Random Blog",
    "data": {
        "_id": "612eb12ab5214e75108e29a7",
        "blogId": "c2de3amkt0nt6om",
        "author": "saima sayed",
        "createdAt": "6:01:3 17/08/2021",
        "updatedAt": "",
        "blogTitle": "Blog 1",
        "blogContent": "Blog Content 1",
        "blogImage": "http://res.cloudinary.com/samm/image/upload/v1630449962/hy1qp1qd8mkvgi1axbrr.jpg",
        "blogImageId": "hy1qp1qd8mkvgi1axbrr",
        "tags": [
            "travel"
        ],
        "relatedLinks": [],
    }
  }
  ```

* **Error Response:**

  **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "No Blogs Present",
    "error": "No Resource Found"
}`


* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/random_blog.png)

### 3. Add a new Blog

Returns json data containing the message and new added Blog.

* **URL**

	`/blogs`

* **Method:**

	`POST`

*  **URL Params**

	**Required:**

	`None`

* **Data Params**
    
    Parameters to be passed as Form-Data
    ```sh
    author: String,
    createdAt: Time(H:M:S or HH:MM:SS) Date(DD/MM/YYYY),
    updatedAt: Time(H:M:S or HH:MM:SS) Date(DD/MM/YYYY),
    blogTitle: String,
    blogContent: String,
    image: Add the Blog Image,
    tags: Array of Tags,
    relatedLinks: Array of link Objs
    ```


* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "Successfully Added a new Blog",
    "data": {
        "blogId": "9vf62tvzkt1zy0o2",
        "author": "saima sayed",
        "createdAt": "6:01:3 17/08/2021",
        "updatedAt": "",
        "blogTitle": "Blog 2",
        "blogContent": "Blog Content 2",
        "blogImage": "http://res.cloudinary.com/samm/image/upload/v1630530809/uw4bwj9a429fdjftx3c0.jpg",
        "blogImageId": "uw4bwj9a429fdjftx3c0",
        "tags": [
            "travel"
        ],
        "relatedLinks": [
            {
                "title": "some title updated",
                "href": "www.wikipedia.com",
                "refId": "",
                "_id": "612fecf94e334ab1d32962b0"
            }
        ],
    }
  }
  ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
    "message": "An Error Occurred while creating a new Blog",
    "error": error that has occurred
}`

	OR

  * **Code:** 500<br />
    **Content:** `{
    "message": "An Error Occurred while saving image",
    "error": error that has occurred
}`

* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/add_blog.png)

### 4. Update an existing Blog

Returns json data containing the message and Updated Blog.

* **URL**

	`/blogs/blogId`

* **Method:**

	`POST`

*  **URL Params**

	**Required:**

	`id = [String]`

* **Data Params**
    
    Parameters to be passed as Form-Data
    ```sh
    author: String,
    updatedAt: Time(H:M:S or HH:MM:SS) Date(DD/MM/YYYY),
    blogTitle: String,
    blogContent: String,
    image: Add the Blog Image,
    tags: Array of Tags,
    relatedLinks: Array of link Objs
    ```

* **Success Response:**

	 **Code:** 200 <br />
	**Content:**
  ```sh
  {
    "message": "Successfully Updated Blog",
    "data": {
        "blogId": "9vf62tvzkt1zy0o2",
        "author": "saima sayed",
        "createdAt": "6:01:3 17/08/2021",
        "updatedAt": "",
        "blogTitle": "Blog 2",
        "blogContent": "Blog Content 2",
        "blogImage": "http://res.cloudinary.com/samm/image/upload/v1630530809/uw4bwj9a429fdjftx3c0.jpg",
        "blogImageId": "uw4bwj9a429fdjftx3c0",
        "tags": [
            "travel"
        ],
        "relatedLinks": [
            {
                "title": "some title updated",
                "href": "www.wikipedia.com",
                "refId": "",
                "_id": "612fecf94e334ab1d32962b0"
            }
        ],
    }
  }
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Blog with Id not Found",
    "error": "Invalid Request"
}`

	OR
  * **Code:** 400 <br />
    **Content:** `{
    "message": "Additional Parameters in Query",
    "error": "Invalid Request"
}`

	OR

  * **Code:** 500<br />
    **Content:** `{
    "message": "An Error Occurred while Updating Blog",
    "error": error that has occurred
}`


* **Example:**

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/update_blog.png)

### 5. Delete an existing Blog

Returns a status code of 204 on successfull deletion of Blog.

* **URL**

	`/blogs/blogId`

* **Method:**

	`DELETE`

*  **URL Params**

	**Required:**

	`id = [String]`

* **Data Params**

	`None`

* **Success Response:**

	 **Code:** 204 <br />
	 

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "message": "Blog with Id not found",
}`

	OR

  * **Code:** 500<br />
    **Content:** `{
    "message": "An Error Occurred while Deleting Blog",
    "error": error that has occurred
}`


* **Example:** 

  ![](https://saima422.github.io/Image-JSON-Data-Repo/BlogBackend-Images/delete_blog.png)

## POSTMAN
View all Sample Requests in POSTMAN.<br>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d8048979afc8a8d4b8f9?action=collection%2Fimport)

OR

[POSTMAN LINK](https://www.getpostman.com/collections/d8048979afc8a8d4b8f9)

## Folder Structure
```
├── app.js
├── controllers
│   └── blogController.js
├── middleware
│   └── globalError.js
│   └── multerUpload.js
├── models
│   └── blogSchema.js
├── public
│   └── index.html
├── package.json
├── package-lock.json
├── _.config.yml
├── config.env
├── README.md
├── routes
│   └── blogRouter.js
└── utils
    └── HandleResponse.js
    └── cloudinaryConfig.js
```

## Scope and Functionality

#### Features:
* Get all Blogs
* Get a Random Blog
* Get a Blog with specific ID
* Add a New Blog
* Update an existing Blog by providing Todo ID
* Delete an existing Blog by providing Todo ID
* MongoDB Database for storing the Blogs
* Cloudinary/Local Storage for storing Blog Images

## Sources

* [Node.js Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/)
* [Node.js - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Node.js?retiredLocale=hu)
* [Introduction to Node.js](https://nodejs.dev/learn)
* [Upload Images to Cloudinary](https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54)

## Contact

Author - Saima Sayed 
<br>
[LinkedIn](https://www.linkedin.com/in/saima-sayed-6482481b9/)
<br>
[Hosted Server on Heroku](https://blog-hosted-backend-server.herokuapp.com/blogs)


