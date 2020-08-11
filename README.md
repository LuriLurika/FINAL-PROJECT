<p align="center">
  <a href="" rel="noopener">
 <img width=160px src='client/public/logo512.png' alt="Project logo"></a>
</p>


<h3 align="center">LEL School</h3>

<div align="center">

  [![Collaborators](https://img.shields.io/badge/collaborators-3%20powergirls-ff69b4)]() 


</div>

---

<p align="center"> LEL School, an academic management project.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Launch](#launch)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
LEL School is a web application based on our very own REST API and created with just one intend: to simplify managements within an academic environment. Wether you are a principal, a teacher or a student... the management of appointments, messages and courses is no longer a concern!

<p align="center">
 <img height=450px src='client/public/login.jpg' alt="Login page"></a>
</p>

### Features
LEL School has three different views depending on your role in the academic center:

#### Principal:
If you are the school's principal you can:
 - Register new teachers and students
 - Create, update and delete events
 - Create, update and delete the subjects of each course
 - Assign a teacher to each subject

#### Teacher:
If you are a teacher you can:
 - Update the subjects info
 - Sign up for events

#### Student:
If you are a student you can:
 - Sign up for events

#### Shared by all:
Everyone can:
 - Send and receive messages from the app (which are notified via email)
 - Modify your own profile (upload a cool picture!)



## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them:


- Create a `.env` file on the root directory to populate the database (`DB`) and port (`PORT`)

- Get yourself some free keys to Cloudinary and GoogleMaps and add them to the `.env` file

- Run `npm i` command on the root directory!

## 🔧 Deployment  <a name = "deployment"></a>

- Run `npm run dev` command on the server directory
- Run `npm start` command on the client directory


## :collision: API documentation <a name = "endpoints"></a>
See our API REST documentation through our beloved [Postman](https://documenter.getpostman.com/view/11893682/T1LLFTi5?version=latest#af61b941-31ff-477f-a99f-2f9995529e9f) Collection :love_letter:


## 🚀 Launch <a name = "launch"></a>
Click [here](https://schoolhack.herokuapp.com/) to see the running app!!


## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) 
- [Express](https://expressjs.com/) 
- [React](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/) 
- [Axios](https://github.com/axios/axios)
- [GoogleMapsAPI](https://github.com/googlemaps/google-maps-services-js) 
- [Nodemailer](https://nodemailer.com/) 
- [Cloudinary](https://www.cloudinary.com/) 


## ✍️ Authors <a name = "authors"></a>
- [@LuriLurika](https://github.com/LuriLurika) 
- [@lucianavina](https://github.com/lucianavina) 
- [@EFdez](https://github.com/EFdez) 


## 🎉 Acknowledgements <a name = "acknowledgement"></a>
This project was developed under the lovely guidance of [@Dayanro](https://github.com/Dayanro) at [Ironhack_Madrid](https://www.ironhack.com/es/madrid) :blue_heart:
