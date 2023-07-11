## PDF Collaboration Tool
This is a tool to help you collaborate on PDFs. It is a web application that allows you to upload a PDF and then share it with others. 

### Assumptions 
- Users should have node and postgres installed on their system.
- The backend repository should be cloned and running on the system, URL: https://github.com/Abhishek-Kharpal/pdf-fe
- The PDFs are not very large in size. The tool is not designed to handle large PDFs.

### Features
- Upload a PDF
- Share a PDF with other users
- Add comments to a PDF
- View comments on a PDF
- Storage up to 500 MB per user

### How to run the application
- Clone the repository
- Run `npm install` to install all the dependencies
- Setup the environment variables and define the PORT and DATABASE_URL
- Run `npm run dev` to start the application
