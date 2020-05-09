const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
//
const render = require("./lib/htmlRenderer");
// Employees Array
const employees = [];
// Manager Questions
const Managerqustions = inquirer.prompt([
    {
        type: "input",
        name: "Managersname",
        message: "Enter Manager's name"
    },
    {
        type: "input",
        name: "Managersid",
        message: "Enter Manager's ID" 
    },
    {
        type: "input",
        name: "Managersemail",
        message: "Enter Manager's email address"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager's office number"
    },
    {
        type: "list",
        name: "Teamdetails",
        message: "Do you have a team?",
        choices: ["Yes","No"]
    }

]).then(function(data){

    var managerDetails = new Manager(data.Managersname, data.Managersid, data.Managersemail, data.officeNumber);
    employees.push(managerDetails);

  if(data.Teamdetails === "Yes")  {
    showEmployeeQuestions();
  }
})
// Common Questions for employee

function showEmployeeQuestions(){
    const EmployeeQuestions = inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter Employee ID" 
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee email address"
        },
        {
            type: "list",
            name: "EmployeeTitle",
            message: "Choose Employee Title",
            choices: ["Intern","Engineer"]
        }
    ]).then(function(data){

        if(data.EmployeeTitle === "Intern"){

            showInternQuestions(data);

        }
        else{

            showEngineerQuestions(data);

        }
    })
};

// Intern Questions
function showInternQuestions(details){
    const InterQuestions = inquirer.prompt([
        {
            type: "input",
            name: "School",
            message: "Enter School name"
        }
    ]).then(function(data){

        var internDetails = new Intern(details.name, details.id, details.email, data.School)
        employees.push(internDetails)
        addMoreEmployees()
    
    })
    
}

// Engineer Questions
function showEngineerQuestions(details){
    const EngineerQuestions = inquirer.prompt([
        {
            type: "input",
            name: "GitHub",
            message: "Enter Github address"
        }
    ]).then(function(data){

        var engineerDetails = new Engineer(details.name, details.id, details.email, data.GitHub)
        employees.push(engineerDetails)
        addMoreEmployees()
    
    })
}

function addMoreEmployees(){
    const MoreQuestions = inquirer.prompt([
        {
            type: "list",
            name: "MoreEmployees",
            message: "Do you want to add more employees?",
            choices: ["Yes","No"]
        }
    ]).then(function(data){

        if(data.MoreEmployees === "Yes"){

            showEmployeeQuestions();
        }

    else{

        var htmlPage = render(employees)

        fs.mkdirSync(OUTPUT_DIR, { recursive: true })

        fs.writeFile(outputPath, htmlPage, function(err){
            if(err){
                return console.log(err);
            }
    
            console.log("Success!")
        });

    }
    })
}



