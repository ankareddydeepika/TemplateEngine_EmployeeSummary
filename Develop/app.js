// const Employee = require("./lib/Employee");
// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");
// ​
// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");
// ​
// const render = require("./lib/htmlRenderer");
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

            showInternQuestions();

        }
        else{

            showEngineerQuestions();

        }
    })
};

// Intern Questions
function showInternQuestions(){
    const InterQuestions = inquirer.prompt([
        {
            type: "input",
            name: "School",
            message: "Enter School name"
        }
    ]).then(function(data){
    
        console.log(data)
    })
    
}

// Engineer Questions
function showEngineerQuestions(){
    const EngineerQuestions = inquirer.prompt([
        {
            type: "input",
            name: "GitHub",
            message: "Enter Github address"
        }
    ]).then(function(data){
    
        console.log(data)
    })
}


