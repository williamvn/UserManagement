# UserManagement
This project is a web app which manage all the users modelated in a MongoDB database through CRUD operations. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9 and Angular Material.

Note: The database and the app's user interface are made in Spanish.

## Installation
```
$ npm install
```

## Functionalities

##### Login
The app work with json web token authentication and hence it is necessary a valid credential to access into the app. To create a valid credential go to the **Back-end Server** section.

##### Display Users
Is the main view where you can see all the Users displayed. There are three tabs which filter the user by role. The first tab includes all kind of users, and then the other two tabs only show the specific role (patient, professional). Each table can be sorted by any of the fields shown and has pagination. Each user shown in the table has three types of actions on him. Edit, delete which can be accessed through buttons and see the internal details of the user, clicking on the row.

![Main View](https://github.com/williamvn/UserManagement/blob/master/main.png?raw=true)

##### Details
In this view are shown all the details of the User selected (is not editable).

![Main View](https://github.com/williamvn/UserManagement/blob/master/Details.png?raw=true)

##### Edit

This view is the same as the detail view, but editable

##### Add New User
This view allow to add a new user, passing for a dynamic form that shows the info that need to be filled in portions to not overwhelm the user.

![Main View](https://github.com/williamvn/UserManagement/blob/master/NewUser.png?raw=true)

##### Delete all doctors
This option delete all the doctors in database and there will not be an undo option, only an alert to confirm that you really want to do this. So be careful if you use it.

#### Search Options

##### Regular Search
On key down a search is done over the names of the Users where the returned data are the users that have the query as substring.

##### Advanced Search
This search option allows filtering the users by their fields, building a query with the following format:

`[field_name]=value&[field_name2]=value2....`

Right now, the current filters allowed are:

`name, lastName, secondLastName, noCollegiate, documentationId, type, NHC, gender`

*Example*:
If you want to know all the doctors present in the database, the query will be:

`type=Médico`

And if you want to know all the doctors whose name is House, the query will be:

`type=Médico&name=House`

Note that there is not need to put all the fields to accomplish a query and also that the filters can be at any position in the query.

## Back-end Server

There is a back-end server implemented for this app. This back-end server is a REST API which serve two endpoints `patients` and `professionals` and allow CRUD operation over  collections with the same names stored in a Mongodb database. To install and run this server go to [here](https://github.com/williamvn/his-rest-api) for more info.


## Development servers
#### Angular Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment
A demo app has been deployed on GitHub pages at [https://williamvn.github.io/].
