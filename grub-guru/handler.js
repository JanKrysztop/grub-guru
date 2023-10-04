const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Your Express routes and middleware here
app.get("/", (req, res) => {
  res.send("Hello from Express.js on AWS Lambda!");
});

module.exports.handler = serverless(app);

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
