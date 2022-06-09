# Markdown HTML convertor
This is my final project for CS50 - a basic markdown editor that easily converts markdown syntax to HTML elements right after you press Enter. This project is highly inspired by Notion, a note-taking software I use in my day-to-day life.  You can also edit the already existing elements and add new lines in the middle.

---

![image](https://user-images.githubusercontent.com/94007441/172900036-5c3055d6-3ead-4642-a945-40d9acb67b49.png)

---

### Video demonstration:
https://youtu.be/aFMGa7qiP5M

## The project itself
For almost two years now, I've been using Notion to organize my life and write notes regarding school and what not. Ever since I started using Notion, I wanted to create my own, personalized version of Notion, my own project management system. After CS50 one of my top ideas for the final project was to implement the basic functionality of Notion, the markdown, the text editing, and formatting. I tried to create a prototype, a basic version of Notion, using almost only Javascript.

## How it works
The html index file - the homepage calls a function declared in static/main.js called "getInput()". The get input function is a recursion function that will continue on creating new empty lines waiting for the user to press Enter. When the user presses Enter, his input will be recorded and the function will call another function, formatText() that will return an HTML element according to the specified markdown syntax, if any.
If the user types '/' at any point, the function will call another function that will build and create the command container with the buttons and images. It will add an event listener for a click on any of the buttons and when clicked, it will add to the origianl value the requested markdown synatx.
A couple other functions work together to figure out when a user wants to edit an element, and will recall the original input written to create the specified line. Then the user will be able to change the formatting and/or the text contents.

## Repository files explained:
- app.py: using flask to connect python and the index.html file found in 'templates' folder.
- templates/index.html: The homepage of the website. The homepage barely has anything in it's body. Every element is created using a function in Javascript. The head in the html file contains the links to the css file, and the font I used (Lato, from Google Fonts).
- static/styles.cc: The main stylesheet for the website. Contains the animations, the alignment and organization of the website.
- static/main.js: The javascript file of the website. The file contains a lot of functions, all working together, using recursion a lot. The functions in the javascript file record keystrokes, mouse clicks, control the input and save each line into a variable. It also creates the command container and deletes it when needed, and avoids bugs. The javascript file and functions is the core of the program. It creates each new element, figures out any user request and converts markdown syntax into the demanded HTML element.
- static/images/...: The images I created and used in my website for the command container. Basically preview images of the different markdown syntax you can use in the website.

### Main challenged I faced
Changing and keeping track of the orignal lines was challenging, and still doesn't work as I wished it to be.
The recursion functions can get quite complex and confusing. Checking for italic/bold formatting was very hard to implement and required a lot of thinking.
