# School Management System Website
* Schools could use our management system to handle attendance,assignments, quizzes etc. This would solve a potential problem since most schools don't use a management system right now.
* Announcements/Home section which will keep students informed about the tests and other events that take place.
* Exclusive Conversations App that can be used to discuss academic related queries and also to share the notes. Each class can have its own group.



# Initial Setup:
1. Navigate to "/login" in cmd.
2. Type "npm install" to install all the dependencies related to the login web app.
3. Then, navigate to "/user" and "/user/server" in cmd & repeat the above step.


Once the above initial setup is done,
In the Root Directory(i.e, WebTech_Miniproject) open 3 separate terminals and execute the commands below in each of the terminals,
1. Type "npm run client" - to start the react client.
2. Type "npm run dev" - to start the development server which is the backend server
3. Type "npm run server"- to start the socket.io

Once, all the servers are setup go to port "5000" in the browser.(localhost:5000)

# Additional Functionalities that could be implemented:
* Fee Payment Gateway: Hassle Free online fee payment along with fee receipt issued instantly after fee payment.
* Assignments Section: Submission of assignments by eliminating redundant tasks of entering the student details for submission of each assignment.
* Chat bot: to answer student queries.
* Calendar: With links to the live classes and attendance.
* Library Section: Look for the availability of library books online and along with the option to borrow

# Dependencies:

1. Login & Register page
* bcryptjs → To encrypt the password(password hashing - Salted hashing).
* connect-flash → Display flash messages.
* ejs → View engine template.
* express-ejs-layouts → Layout support for ejs that enables re usability(used it for the partials).
* express-fileupload → For handling file uploads.
* express-session → Handling login sessions i.e, creates session cookie to identify user.
* mongoose → An Object Modeling Tool for MongoDB. It allows us to define the schema for the documents in a particular collection.
* passport → Authentication MW used for login.(Local Strategy) 
* nodemon → It automatically restarts the server whenever we make  a change.
* MongoDB Atlas→ Cloud DB Service.
* “bootswatch.com” → Bootstrap theme.
* “fontawesome.com” → SVG Icons.

2. Layouts part

* @materialui/core → All styles,alerts,dialogs,buttons and text fields.
* @materialui/icons → For all the icons that is used.
* react-router-dom → To handle all the routing within the react app(i.e, using Link,Router and Switch).

3. Conversations Section:

* Client side:
  * @materialui/core → All styles,alerts,dialogs,buttons and text fields.
  * @materialui/icons → For all the icons that is used.
  * react-router-dom → To handle all the routing within the react app.
  * socket.io-client → For emiting events to which the socket.io server would respond.

* Server side:

  * socket.io → Web Socket Technology used on the server part which will listen to the events emitted from the socket.io client and then respond to it. It enables realtime, bidirectional communication channel b/w client and server unlike other application servers. It is event-driven.
  * nodemon→  To automatically Restart the socket.io server whenever we make a change.
