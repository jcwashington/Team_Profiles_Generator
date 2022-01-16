const path = require("path");
const fs = require("fs");
const { template } = require("@babel/core");
const { placeholder } = require("@babel/types");

const templates = path.resolve(__dirname, "../src");

const render = teamMembers => {
    const html = [];

    html.push(teamMembers
        .filter( teamMember => teamMember.getRole() === "Manager")
        .map(manager => renderManager(manager)));
    html.push(teamMembers
        .filter( teamMember => teamMember.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer)));
    html.push(teamMembers
        .filter( teamMember => teamMember.getRole() === "Intern")
        .map(intern => renderIntern(intern)));

    return renderHTML(html.join(""));
};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templates, "manager.html"), "utf-8");

    template = removePlaceholders(template, "name", manager.getName());
    template = removePlaceholders(template, "role", manager.getRole());
    template = removePlaceholders(template, "id", manager.getId());
    template = removePlaceholders(template, "email", manager.getEmail());
    template = removePlaceholders(template, "officeNumber", manager.getOfficeNumber());

    return template;
};

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templates, "engineer.html"), "utf-8");

    template = removePlaceholders(template, "name", engineer.getName());
    template = removePlaceholders(template, "role", engineer.getRole());
    template = removePlaceholders(template, "id", engineer.getId());
    template = removePlaceholders(template, "email", engineer.getEmail());
    template = removePlaceholders(template, "officeNumber", engineer.getGithub());

    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templates, "intern.html"), "utf-8");

    template = removePlaceholders(template, "name", intern.getName());
    template = removePlaceholders(template, "role", intern.getRole());
    template = removePlaceholders(template, "id", intern.getId());
    template = removePlaceholders(template, "email", intern.getEmail());
    template = removePlaceholders(template, "officeNumber", intern.getSchool());

    return template;
};

const renderHTML = html => {
    const template = fs.readFileSync(path.resolve(templates, "main.html"), "utf-8");
    return removePlaceholders(template, "team", html);
};

const removePlaceholders = (template, variable, value) => {
    const placeholder = new RegExp(`{{ ${variable} }}`, "gm");
    return template.replace(placeholder, value);
}

module.exports = render;