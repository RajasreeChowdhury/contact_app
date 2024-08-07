# Table of Contents
1) Overview
2) Dependencies
3) Components
4) Pages
5) APIs Used
6) Setup Instructions
7) Deployed Link


# Overview
The Contact Management App is a web application built using ReactJS, TypeScript, TailwindCSS, React Router v6, and React Query (Tanstack Query). The app features a contact management system and a dashboard displaying charts and maps with COVID-19 data.


# Dependencies
- React: Frontend library
- TypeScript: Type checking
- TailwindCSS: Styling
- React Router v6: Routing
- React Query (Tanstack Query): Data fetching
- Axios: HTTP client for API requests
- React-Leaflet: Map integration
- Chart.js: Charting library
- Material UI : UI icons


# Components
- 'ContactForm' : The ContactForm component is used for adding a new contact.
- 'Edit_Contact' : The EditContact component is used for editing an existing contact.
- 'Popup' : The Popup component displays a popup dialog for contact details.
- 'SideBar' : The SideBar component displays a sidebar with navigation links
- 'WorldMap' : The WorldMap component displays a map with COVID-19 data for each country.


# Pages
- 'AllRoutes' : The AllRoutes component handles routing for the application.
- 'Charts and Maps' : The Charts and Maps page displays a chart and a map with COVID-19 statistics.
- 'Contacts' : The Contacts page displays a list of contacts and allows for adding, editing, and deleting contacts.


# APIs Used
The app uses the following APIs to fetch data:

- World wide data of cases: https://disease.sh/v3/covid-19/all
- Country Specific data of cases: https://disease.sh/v3/covid-19/countries
- Graph data for cases with date: https://disease.sh/v3/covid-19/historical/all?lastdays=all


# Installation and Setup
To run this app, follow these steps:

- Clone this repository: git clone https://github.com/your-username/contact-app.git
- Install the dependencies: npm install
- Start the app: npm start
- The app should open in your default browser at http://localhost:3000/.


# Deployed Link : - 

