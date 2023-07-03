This is a simple NodeJS project using express and MongoDB. 

teps to run this project 
    1. Clone my repository - https://github.com/karamveershamal/enverx-be-developer-assignment
    2. Take a fresh Pull
    3. Run the command "npm install" in the terminal
    4. Run the command, "npm start" to run in nodemon or "npm run development" to run without nodemnon, if they don't work try "node app.js"
    5. Below I have given curls to test the API

Curl for create blogs, 
curl --location 'localhost:3000/api/blogs' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Nature Bliss",
    "content": "Some random information",
    "author": "Karam",
    "category": "science"
}'

Curl for Update blogs, 
curl --location --request PUT 'localhost:3000/api/blogs/64a27bff55637b45c177b898' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Nature Bliss",
    "content": "Some random information",
    "author": "Karam",
    "category": "science"
}'

Curl for get blogs By Id(Use valid MongoId), 
curl --location 'localhost:3000/api/blogs/64a27bff55637b45c177b898'

Curl for get All blogs,(sortBy can be createdAt or name)
curl --location 'localhost:3000/api/blogs?category=philosophy&sortBy=name'

Curl for delete blogs, 
curl --location --request DELETE 'localhost:3000/api/blogs/64a277b9f3843a6fe9abe529' \
--data ''
