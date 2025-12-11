# SBA-React-Dashboard-Application

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.To run application you want to cd into the task-dashboard folder and run 
npm run dev in the terminal.This will provide a local host port that when opened in the browser will display the site.


## Overview
This App displays basic knowledge of application development  with React and Typescript.I used CSS for the styling.The color themes are beautifully chaotic but that was the look I was going for as it is appealing to me... my dark mode is not that dark. 


## My process

First I thought about my component structure I knew that I needed a form component for task and component to store my task after they had been submitted. I first crafted the basic structure of the form and then how a single task item would look. I then made sure the functionality worked between the form and single task I made sure to add every task that was successfully submitted to a task list that would be used to display a task card for every item on the list. After this worked properly I worked on the CSS as I feel like this is my chance to be creative it felt good making this project feel and look like candy or something sweet lol. After the CSS looked good enough I then implemented  the filter functionality adding a search bar and two property filters in a component and passing it to the dashboard. I applied the search and filters to a copy of the task list array and passed the filtered list to the task list component.After my functionality seemed to work correctly I made small tweaks to my css like adding padding, changing colors and stuff like that.


[!screenshot of app](/task-dashboard/ScreenShot.png?raw=true)

### MVP GOALS
Users should be able to:
- Toggle the color scheme between light and dark mode
- Add Task with status and priorty 
- Choose a due date for the Task 
- Filter and Search Task 
- Delete Task 
- Update Task Status 
- Reload previous Task via local storage 
- use visual indicators as guidance for application 


