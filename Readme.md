change directory:
    > cd SPAPRP
install dependencies:
    > npm install
run the app:
    > SET DEBUG=spaprp:* & npm start



To create a Project Object
{
	"projectName" : "Student's Performance and Project Reporting Portal",
	"description" : "This project has been done with collaboration by Aman Kumar Mishra, Anurag Tiwari and Tathagat Kumar for SE lab project work.",
	"link" : "https://github.com/anurag1504t/SPAPRP",
	"teckStack" : ["NodeJS", "MongoDB", "HTML", "CSS", "Javascript"],
	"contributers" : ["Aman Kumar Mishra", "Anurag Tiwari", "Tathagat Kumar"]
}

To create a User
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
		},		
		{		
			"semester" : 1,		
			"gradePoint" : 8.45		
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
		},		
		{		
			"semester" : 1,		
			"gradePoint" : 7.8
		}		
	]		
}

Creation of Marks Object
{
	"userId" : "bcs_201811",
	"batch" : "bcs2018",
	"semesters" : [
		{
			"semester" : 2,
			"subjects" : [
				{
					"subjectCode" : "DCS",
					"subjectName" : "Digital Circuit Systems",
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
					"subjectCode" : "DCS",
					"subjectName" : "Digital Circuit Systems",
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