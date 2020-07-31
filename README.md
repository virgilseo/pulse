# Pulse

Event planner app featuring select events in the city of Amsterdam.

## Table of Contents

* [Instructions](#instructions)
* [Installation](#installation)
* [Api](#api)
* [Vue](#vue)

## Instructions

The purpose of this app is to display information about current and future events in the city of Amsterdam, Netherlands.

When the user navigates to the home page, ten events are fetched from the api by default and displayed to the user. Each event is clickable to its details page. The details page shows additional information about the event and also useful links for tickets and seat map as well. Additionally, three related events are displayed on the page as well.

The categories selection option allows the user to see different events based on type. Available event types are: music, art and theater and miscellaneous. When the user selects a category, the app makes an api call and displays events in that certain category.
Another feature implemented for the home page allows the user to sort the events based on name and date, ascending and descending.

The footer features a quick navigation container based on a generated site map. The map is also available in xml formal which is very important for SEO (search engine optimization), considering modern front-end frameworks don't generate a site map by default.

## Installation

Clone the current repository using: git clone https://github.com/virgilseo/pulse.git

Next, from the project folder you need to open a terminal window and run the following command: npm install. After the installation has finished then run this command: npm run serve.
After this a browser window will open on localhost:8080 and you can start using the app.

If you close the browser window and want to use the app again just remember you can find the it @ localhost:8080.

## Api
The application uses third party api to display the map and fetch information about the events.

1. Ticket Master Api: https://developer.ticketmaster.com/products-and-docs/apis/getting-started/

## Vue

The app was build using a powerful javascript front end framework, called Vue.js. Here is a link to their home page: https://vuejs.org/
