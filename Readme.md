# Students’ Performance and Project Reporting Portal
Students’ Performance and Project Reporting Portal is a website developed with Node JS, MangoDB, Express, HTML, CSS, Bootstrap etc.

Credit for Bootstrap Template
<!-- =======================================================
  * Template Name: Mentor - v2.0.0
  * Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->

## Installation

To install all the dependencies and to run the website, follow following commands in the terminal.

change directory:   
    > cd SPAPRP   
install dependencies:    
    > npm install      
run the app:     
    > npm start  

To connect to the MongoDb database server, Open a new terminal, navigate to the SPAPRP folder and run the following command.
mongod --dbpath=data --bind_ip 127.0.0.1

Now visit "localhost:3000" on any browser.

List of Node Dependencies(Libraries)
	"body-parser": "^1.19.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "mongoose": "^5.9.16",
    "morgan": "~1.9.1",
    "nodemon": "^2.0.4"
  
 ## Features
 
There are two important features of this project

 ### Project Section

This section deals with the sharing of project ideas, through the website. Any student can post the details of his/her original work.
Act as an interface for students to show case their skills.

All the backend API's are completed and it can be accessed at path "routes\projectRouter.js". It has been fully integrated with the frontend part.
Due to the CORS policies, some browsers require an extention, so that API calls can be completed, through our frontend.

If using Chrome download the following Extention.
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en

Note: When the extention is enabled, it can cause errors to loading other websites such as youtube.com, etc. Hence, the extention should be disabled/removed after the successful testing of the API endpoints "http://localhost:3000/projects/". There are four endpoints each supporting GET, POST, PUT and DELETE methods.

These endpoints can also be tested on POSTMAN.
To create a new project, use the below template:
{
	"projectName" : "Test Project Name",
	"description" : "2-3 Lines to Describe the project",
	"link" : "https://github.com",
	"teckStack" : ["XYZ", "ABC"],
	"contributers" : ["XYZ", "ABC"]
}

 ### Result Section

The second important feature of the website is Result Creation.
Only backend portion of this section is implemented. 
To test the API endpoints, POSTMAN should be used.

In this section, first a profile of student is to be created. There are two database documnets named users(contains profile of each student. To check schema of the document visit "/models/users.js") and marks( This document contains marks of each student in each semester in each subject, distributed among components, like major, minor, etc. Visit "/models/marks.js" to check the schema of the document.).

In each document profile of the student is created. When marks are enterd in the database, the admin or a faculty can send the weightage of each component for the result creation based on the fuzzy-logic. Based on the batch and semester, the result of each student for the semester is created and pushed into the SGPA field of the profile of student in document "/models/users.js". CGPA is also updated.

The following profile is already created in the database. Check it by sending requests on endpoints "http://localhost:3000/users" and "http://localhost:3000/marks" by GET method.


There are two users in users document.
{		
	"userId" : "bcs_201811",		
	"password" : "anurag@123",		
	"name" : "ANURAG TIWARI",		
	"batch" : "bcs2018",		
	"CGPA" : 8.41,		
	"SGPA" : [		
		{		
			"semester" : 1,		
			"gradePoint" : 8.13		
		},		
		{		
			"semester" : 2,		
			"gradePoint" : 8.43		
		}	
	]		
}		
{		
	"userId" : "bcs_201804",		
	"password" : "aman@123",		
	"name" : "AMAN MISHRA",		
	"batch" : "bcs2018",		
	"CGPA" : 7.98,		
	"SGPA" : [		
		{		
			"semester" : 1,		
			"gradePoint" : 8.13		
		},		
		{		
			"semester" : 2,		
			"gradePoint" : 8.09		
		}	
	]		
}

Following are the corresponding data objects in the "marks" document. 
{
	"userId" : "bcs_201811",
	"batch" : "bcs2018",
	"semesters" : [
		{
			"semester" : 2,
			"subjects" : [
				{
					"subjectCode" : "DS",
					"subjectName" : "Data Structues",
					"major" : 40,
					"minor" : 30,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "DBS",
					"subjectName" : "Database Systems",
					"major" : 38,
					"minor" : 28,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "EM2",
					"subjectName" : "Engineering Mathematics 2",
					"major" : 42,
					"minor" : 32,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "DCS",
					"subjectName" : "Digital Circuit Systems",
					"major" : 41,
					"minor" : 31,
					"attendence" : 5,
					"assignment" : 5
				}
			]
		},
		{
			"semester" : 1,
			"subjects" : [
				{
					"subjectCode" : "EM1",
					"subjectName" : "Engineering Mathematics 1",
					"major" : 40,
					"minor" : 30,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "EP",
					"subjectName" : "Engineering Physics",
					"major" : 38,
					"minor" : 28,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "EHV",
					"subjectName" : "Ethics and Human Values",
					"major" : 42,
					"minor" : 32,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "CP",
					"subjectName" : "Computer Programming",
					"major" : 41,
					"minor" : 31,
					"attendence" : 5,
					"assignment" : 5
				}
			]
		},
		{
			"semester" : 3,
			"subjects" : [
				{
					"subjectCode" : "OS",
					"subjectName" : "Operating Systems",
					"major" : 40,
					"minor" : 30,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "COA",
					"subjectName" : "Computer Organisation and Architecture",
					"major" : 38,
					"minor" : 28,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "OOPS",
					"subjectName" : "Object Oriented Programming Systems",
					"major" : 42,
					"minor" : 32,
					"attendence" : 5,
					"assignment" : 5
				},
				{
					"subjectCode" : "ES",
					"subjectName" : "Environmental Science",
					"major" : 41,
					"minor" : 31,
					"attendence" : 5,
					"assignment" : 5
				}
			]
		}	
	]
}

Now, send the request to "http://localhost:3000/createResults" with method = POST. Use bellow object as the weightage of each component to create result using fuzzy logic. Body should contain the following object in form JSON.
{
	"batch" : "bcs2018",
	"semester" : 3,
	"major" : 0.5,
	"minor" : 0.4,
	"assignment" : 0.05,
	"attendence" : 0.05
} 
After the successful execution of the request, the results should be reflected into the profile of each student.
To check that, submit a GET request on "http://localhost:3000/users/:userId" API.
