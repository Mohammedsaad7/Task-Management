Task management

Technologies used:
backend : .Net Web API (.Net 8.0)
frontend: Angular 17
database: Mongodb

Prerequisites:
.Net 8.0  (I used visual studio 2022, but anything is fine as long as you can launch the api)
Angular 17 
Mongodb (Mongo shell will be good to have)

Setup:
After you have installed all of the prerequisites you will have to make sure all the addresses are configured correctly.

.Net Web API
- In the .Net Web API project you have to configure the connection string to your mongodb in the startup.cs file.
- You also have to setup Cors with the correct address of the Angular application
- You also have to always allow the SSl.
- To allow locally signed certificate in firefox you click on Advanced and proceed anyway.
- To allow locally signed certificate in chrome you navigate to either 'chrome://flags/#allow-insecure-localhost' or 'chrome://flags/#temporary-unexpire-flags-m118' and enable it.

Angular application:
- In the environments.development.ts and the environment.ts files configure the address for the .Net application like so "https://localhost:7226/api/"
- You have to run npm install in the terminal

MongoDb
- Using the mongoshell you have to run the scripttorun.js like so : load('../../Users/Saad/source/repos/TaskManagement/scripttorun.js')
- Make sure the location of the script file is correct as this contains some data necessary for the application and also some dummy data that you can use.
- If you don't want to run this script. You can always launch the API and Execute the /api/Status/InsertStatuses method to add the necessary data.
