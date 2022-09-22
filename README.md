# GUESS LOCATION

<img alt="image" src="https://brotherants.com/skillupmentor/images/02-project-header.png" width="600px" /> 

**Short description** :

Create a Full-stack application that allows users to upload an image and mark the exact location on the Google map where the image was taken.
Registered users then try to guess where the image was taken by placing a pin on the Google map. As a result, the app returns how accurately he chose the location (error distance). 

**Technologies you will use** :
Html, Css, MUI (ex. MaterialUI), Figma, JavaScript, Typescript, Node, NestJS, Express, React, Docker, Amazon AWS, Amazon S3, Git, GitHub, Jest, PostgreSQL, TypeORM, JWT, Postman, Swagger, Trello

<img alt="image" src="https://brotherants.com/skillupmentor/images/image5.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image7.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/mui-icon.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image12.png" width="25px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image17.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image4.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image3.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image19.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image1.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image11.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image18.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image16.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/aws-s3-icon.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image2.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image10.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/jest-icon.jpeg" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image8.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image15.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image14.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image9.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/swagger.png" width="30px" /> <img alt="image" src="https://brotherants.com/skillupmentor/images/image13.png" width="30px" />

***Alert:***

- Use Swagger instead of Postman (https://docs.nestjs.com/openapi/introduction)


**Pre-requirements** :

- all from 01-project
- Google account (for maps)


**Prepared** :

- Figma design and UX for frontend
- Tests for users are prepared
- API in NestJS for user prepared
- Credentials for PostgreSQL DBMS
- Trello template for managing tasks

**Use** :
- The latest stable Node
- **Typescript**
- For DBMS use PostgreSQL
- Latest stable NestJS with Express.js framework (**Typescript**)
- Git &amp; GitHub (create separate Git for backend and frontend)
- Latest stable ReactJS for frontend (with **TypeScript** )
- Postman for testing API
- MaterialUI
- Jest for tests
- Trello (Breakdown task, Estimate time for task)


**Required functionality** :
- JWT token authentication
- Implement forgot password functionality (send reset token to user email)
- File upload on Amazon S3
- JSON server responses
- Docker
-  Docker: For local environment configuration (database, env vars, ...)
-  Docker: Dockerfile for building a docker image from the application code
- Deploy backend Docker Container on AWS
- Deploy frontend on AWS S3
- Tests (backend only) - EndToEnd test
-  Tests: All your endpoints must have at least one test, multiple edge case tests are a bonus
-  Tests: All tests must pass
-  Tests: Separate environment for testing
- Implement Logging (logger)
- Implement Cors (Cross-origin resource sharing)
- Reactive form validation
- Migrations for database
- Figma pixel perfect design
- Swagger for API documentation
- Use .ENV for database credentials (security).


**Don&#39;t forget** :
- Prepare Readme.md to describe the application in GitHub.
- Maintain a consistent code style (Usage of linters/prettifiers is recommended).
- Divide the tasks in Trello according to the instructions. For each task estimated time (in hours) for completing the task.
- Branch each task in Github (GitFlow).

**Design and explanation** :
- [Link to Figma](https://www.figma.com/file/fNO8cxMjk7blcQP4BbK9PT/Geotagger(Updated)?node-id=0%3A1)
- For location save only latitude and longitude (location name is optional).

**Description** :
The REST API should provide adequate JSON responses to these endpoints. The **bolded** endpoints are authenticated calls. Select the appropriate REST calls (get, put, post, delete) by yourself.

Endpoints (add other endpoints that you need):
/auth/login
/auth/register

/location

```Return list of latest locations (you can add pagination)```

/location/random 

```Return random location```

/location 

```Create location```

/location/guess/:id 

```Guess the location lat/lon```

***Explanation***:
- For calculating distance, you can use Google Maps API or you can use PostgreSQL PostGIS ([https://postgis.net/](https://postgis.net/)).
- You will have to make pagination (on the backend) for displaying a list of locations.
- Upload user avatar images on AWS S3 is required.


**Material (tutorials …)**:
- <a href="https://ionian-pram-941.notion.site/SkillUp-Mentor-Pre-Boarding-SLO-6867a8fefbee4e6c8e073a72c0119aa2" target="_blank">Pre-boarding document</a>
- <a href="https://trello.com/b/zDGE8zl0/project-template" target="_blank">Trello template</a>
- <a href="https://ionian-pram-941.notion.site/SkillUp-Mentor-Project-Materials-ENG-951d7f30080a43cb8363c5daa32e08be" target="_blank">Project materials</a>
- Jest for test
- End to end testing 
- MaterialUI + Styled ([https://mui.com/system/styled/](https://mui.com/system/styled/))
- Swagger
- Logging
- Cors
- Form validation

**But first**:
- Share your GitHub repository with mentors@skillupmentor.com
- Share your Trello board with mentors@skillupmentor.com

**Use Functional Components in React!**

<img alt="Use Functional Components in React!" src="https://brotherants.com/skillupmentor/images/functional-class-compnent.png" width="600px" />

**CODE REVIEW**:
When you finish the project, apply for a code review: <a href="https://forms.gle/sxtxWrzJaom81Dxx8" target="_blank">Code review apply</a>

**Disclaimer :**

*This assignment is protected with SkillUp Mentor copyright. The Candidate may upload the assignment on his closed profile on GitHub (or other platform), but any other reproduction and distribution of the assignment itself or the assignment&#39;s solutions without written permission of SkillUp Mentor is prohibited.*
