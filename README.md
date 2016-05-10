# SF-Muni

## Resourses
* D3-On-Angular-Seed

## Getting Started
Clone the project repository using git:

```
mkdir SF-Muni
git clone https://github.com/lianliu/SF-Muni.git SF-Muni
cd SF-Muni
```

Run:

```
npm install
bower install
grunt serve
```

## SF-Muni
The project presents a map that updates and shows positions of San Francisco's buses in the last 15 minutes. The app will update the position info every 15 seconds. Users can hover and choose the routes from the left side navigation, and see the highlighted routes and their associated buses on the map.

This project is done using Angular.js and d3.js. If you want to interact with the app, please click this [link](http://realtimesfmuni.herokuapp.com/#/).

## TODO
* A Smooth animation of bus location transition
* More interactions with the map
  * Popovers for routes on map to display more info, such as stop info, schedules, and important info. 
  * Popovers for buses on map to display more info, such as each bus direction, speed, predictions and schedules.
* a more delicate data structure for storing bus locations, which aims at enhancing user experience.

