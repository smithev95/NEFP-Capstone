# NEFP-Capstone

Spring-Summer 2024

## Team members

Evan Smith  
Devon Bedenbaugh  
Tyler Evans  
Ploy Nitipiyaroj  
Sean Hendrickson  

## Setting up dev environment

After cloning the remote repository to your local machine:

1. In the directory containing `requirements.txt`, run
   `pip install -r requirements.txt`.
   Alternatively, you can create a virtual environment first then run the `pip` command.
3. Download the latest version of npm to use React. Run
   `npm install -g npm`. You can confirm it has downloaded by running `npm -v` to see what version you are running on.
4. Create a `.gitignore` file, put it somewhere in your project directory.  
   Github has a useful gitignore for python projects:  
   https://github.com/github/gitignore/blob/main/Python.gitignore

## Starting backend

1. Change directory to `backend`.
2. Run `python manage.py runserver`.
3. A URL link for local development server should appear.

## Starting frontend

1. Change directory to `frontend`.
2. Run `npm install` to install dependencies from `package.json`.
3. Run `npm start`.
4. A URL link for local development should appear, or React app will open in default browser automatically.

## Contributing to the project

1. Assign yourself a ticket from the project Kanban board and move it to "In progress".
2. Create a branch for the change/ticket you would like to work on.
3. Once you're ready for other team member to review your changes, create a pull request (PR).
   Be sure to provide details on the changes you've made and how you've tested the change locally.
   Here is an example of a PR template:
   
   ```
   # Describe your changes
   
   # Issue ticket number and link

   # Testing done

   # Checklist before requesting a review
   [ ] I have performed a self-review of my code
   [ ] If it is a core feature, I have added thorough tests or throroughly tested manually
   [ ] Will this be part of a product update? If yes, please write one phrase about this update.
   ```
4. At least one team member has to review and approve the PR before the changes can be merged to `main`.
5. Add the PR link to the associated ticket in the Kanban board
6. Mark the ticket as completed.

## Project Kanban Board

https://github.com/users/smithev95/projects/1/views/1
