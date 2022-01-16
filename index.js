const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");

const generateHTML = require("./lib/generateHTML");
const { template } = require("lodash");
const { placeholder } = require("@babel/types");

const teamMembers = [];

function start() {
    managerQuestions();
}

function managerQuestions() {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Team Manager's name: "
            },
            {
                type: "input",
                name: "id",
                message: "Team Manager's ID number: "
            },
            {
                type: "input",
                name: "email",
                message: "Team Manager's email address: "
            },
            {
                type: "input",
                name: "office",
                message: "Team Manager's office number: "
            }
        ]).then(data => {
        const manager = new Manager(data.name, data.id, data.email, data.office);
        teamMembers.push(manager);
        addNewMember();
    })
};

function addNewMember() {
    inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Do you want to add an engineer or intern to the team? ",
                choices: ["An Engineer", "An Intern", "No"]
            }
        ]).then(member => {
        if (member.role === "An Engineer") {
            engineerQuestions();
        } else if (member.role === "An Intern") {
            internQuestions();
        } else {
            createHTML();
        }
    })
}

function engineerQuestions () {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Engineer's name? "
            },
            {
                type: "input",
                name: "id",
                message: "Engineer's ID number: "
            },
            {
                type: "input",
                name: "email",
                message: "Engineer's email address: "
            },
            {
                type: "input",
                name: "github",
                message: "Github username: "
            }
        ]).then (member => {
        const engineer = new Engineer(member.name, member.id, member.email, member.github);
        teamMembers.push(engineer);
        addNewMember();
    })
}

function internQuestions () {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Intern's name? "
            },
            {
                type: "input",
                name: "id",
                message: "Intern's ID number: "
            },
            {
                type: "input",
                name: "email",
                message: "Intern's email address: "
            },
            {
                type: "input",
                name: "school",
                message: "Intern's school: "
            }
        ]).then (member => {
        const intern = new Intern(member.name, member.id, member.email, member.school);
        teamMembers.push(intern);
        addNewMember();
    })
}

function createHTML () {
    let team = teamMembers;
    const html = generateHTML(team);

    fs.writeFile('./output/index.html', html, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    })
    console.log('Check ./output for your HTML file');
}

start();