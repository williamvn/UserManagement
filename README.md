# UserManagement
This project is a web app which manage all the users modelated in the db.json database through CRUD operations. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9 and Angular Material.

Note: The database and the app's user interface are made in Spanish.

## Functionlities
##### Login
Only the view has been implemented, no logic for now.

##### Display Users
Is the main view where you can see all the Users displayed. There are three tabs which filter the user by rol. The first tab includes all kind of users, and then the other two tabs only show the specific rol (patient, professional). Each table can be sort by any of the fields shown and has pagination. Each user shown in the table has three types of actions on him. Edit, delete which can be accessed through buttons and view the internal details of the user who can be accessed by clicking on the row.

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

`id, name, lastName, secondLastName, noCollegiate, documentationId, type, NHC`

*Example*:
If you want to know all the doctors present in the database, the query will be:

`type=Médico`

And if you want to know all the doctors whose names are House, the query will be:

`type=Médico&name=House`

Note that there is not need to put all the fields to accomplish a query and also that the filters can be at any position in the query.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. To run the backed json server, you must install json-server (https://github.com/typicode/json-server) and raise the server over json `db.json` on the port 3000.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
