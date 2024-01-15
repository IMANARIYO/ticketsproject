
export const htmlMessageOfapplicationytr= `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 20px;
      }
      h1 {
        color: #4285f4;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application Successful</title>
  </head>
  <body>
    <h1>Thank you for applying!</h1>
    <p>Your application was successful. We will review the information you have provided, and you will receive a response soon!</p>
  </body>
</html>
`;

export const htmlMessageApprovegfdfgfd= `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #e6ffe6;
        color: #006600;
        margin: 20px;
      }
      h1 {
        color: #006600;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application Approved</title>
  </head>
  <body>
    <h1>Congratulations!</h1>
    <p>Your application has been approved. Welcome to our community!</p>
  </body>
</html>
`;

export const htmlMessageRejected = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #ffcccc;
        color: #cc0000;
        margin: 20px;
      }
      h1 {
        color: #cc0000;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application Rejected</title>
  </head>
  <body>
    <h1>We regret to inform you</h1>
    <p>Unfortunately, your application has been rejected. Please feel free to apply again in the future.</p>
  </body>
</html>
`;export const htmlMessageOfapplication= `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 20px;
      }
      h1 {
        color: #4285f4;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application Successful</title>
  </head>
  <body>
    <h1>Thank you for applying!</h1>
    <p>Your application was successful. We will review the information you have provided, and you will receive a response soon!</p>
  </body>
</html>
`;

export const htmlMessageApproved = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #e6ffe6;
        color: #006600;
        margin: 20px;
      }
      h1 {
        color: #006600;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application Approved</title>
  </head>
  <body>
    <h1>Congratulations!</h1>
    <p>Your application has been approved. Welcome to our community!</p>
  </body>
</html>
`;

// Function to generate the verification link
// const generateVerificationLink = (token) => {
//   return `http://your-verification-link?token=${token}`;
// };

// Updated signup template with a button
export const signupHtmlMessage = (verificationToken) => `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #ffcccc;
        color: #cc0000;
        margin: 20px;
      }
      h1 {
        color: #cc0000;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .button-container {
        margin-top: 20px;
      }
      .verification-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #cc0000;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
    <title>Signup Successful</title>
  </head>
  <body>
    <h1>Successful registration on Route Easy </h1>
    <p>Thank you for registering! To complete your registration, please verify your email by clicking the button below:</p>
    <div class="button-container">
      <a class="verification-button" href="${verificationToken}">Verify Email</a>
    </div>
  </body>
</html>
`;


export const htmlMessageWaitingList = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #ffffcc;
        color: #996600;
        margin: 20px;
      }
      h1 {
        color: #996600;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    </style>
    <title>Application on Waiting List</title>
  </head>
  <body>
    <h1>Your application is on the waiting list</h1>
    <p>Your application has been added to the waiting list. We will notify you if a spot becomes available.</p>
  </body>
</html>
`;
