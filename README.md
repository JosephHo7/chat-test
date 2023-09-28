**REACT NATIVE CHAT APP** <br>
**Key Features** <br>
This application was designed to create a mobile chat app using React Native. This app will include key features that allow a user to 
- Enter a page where users can enter their name and choose a background color for the chat screen
before joining the chat
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending imagesand location data.
- Data gets stored online and offline using Google FireBase.

This application utilizes technologies like Expo, React Native, Android Stuidos Emulator, Node.js, Google FireBase

**Setting up Environment** <br>
To use this application, use the Expo app in iOS or use an Android emmulator. Make sure to have the Expo CLI installed. You'll also need to create an account with Expo.
If testing on an Android simulator, use Android Studio. 

**Database Configuration** <br>
This app utilizes FireStore Database to store the data. You can configure the database by going to https://firebase.google.com/ 
and creating a new project if you dont already have one set up. When setting up the database, make sure to change "allow read, write: if false;" to "allow read, write: if true;" in the rules tab.
Then copy the FireBase configuration from the database and put it in the App.js file

**Using the Chat App** <br>
Once the environment and database have been created and configured, you can now use the app.
To start the app, navigate to the root folder of the project and use -npm expo start (if using android emmulator, you can also run using -npm expo start --android). Starting the app with
-npm expo start --offline with enable offline testing. 
<br> Note: Expo only supports Node up to version 16.19.0 so make sure to change the version if you are running a newer version of node (use version manager
-nvm use 16.19.0) 
