# Dictionary Application
The Dictionary Application is a web application built with Node.js, React, and PostgreSQL. It allows users to search for words in English and create dictionary entries with translations in multiple languages.

## Features
Search for word translations in English.
Create new dictionary entries with translations.
Supported languages for translations include: Spanish, French, German, Italian, Chinese, Japanese, Korean, Russian, Arabic, and Hebrew.
## Technologies Used
Node.js
React
Redux
PostgreSQL
Express.js
Prisma
Axios
Joi
## Installation

1. Clone the repository:
- git clone https://github.com/rachelsin/dictionary.git

2. Navigate to the backend directory and install the dependencies:
- cd backend
- npm install
  
3. Create a PostgreSQL database and update the database connection details in the .env file.

4. Run database migrations to create the necessary tables:
- npx prisma generate
- npx prisma migrate dev --name init
- npx prisma db push
  
5. Start the backend server:
- npm start

6. Open another terminal and navigate to the frontend directory:
- cd frontend
- npm install
  
7. Start the frontend development server:
- npm start

8. Access the application in your browser at http://localhost:3000.

## Usage
Search for Word Translation:

Enter an English word in the search bar and select a language from the dropdown menu.
Click the "Search" button to retrieve the translation for the word in the selected language.
Create Dictionary Entry:

Click on the "Create Entry" button to navigate to the create entry form.
Enter the English word and provide translations for multiple languages.
Click the "Create Entry" button to save the dictionary entry.
