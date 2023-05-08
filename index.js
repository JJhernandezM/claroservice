#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import shelljs from 'shelljs';


const createdProjectok = filepath => {
    console.log(
        chalk.white.bgRedBright.bold(
            `!Muy bien! proyecto creado correctamente en el directorio ${filepath}`
        )
    );
}


const createProject = (nameservicio, modulo,  oracleService) => {
    const pathfichero = `${process.cwd()}/${nameservicio}`;
    const module = `${process.cwd()}/${nameservicio}/${modulo}`;
    shelljs.mkdir(pathfichero);
    shelljs.mkdir(module);
    shelljs.cd(module);
    shelljs.mkdir('application');
    shelljs.cd(module);
    shelljs.mkdir('domain');
    if(oracleService) {
        shelljs.cd(module);
        shelljs.mkdir('infrastructure')
    }
    return pathfichero;
}

const templateAnswer =() => {
    const answers = [
        {
            name: "PROYECTO",
            type: "input",
            message: "Nombre del microservicio"
        },
        {
            name: "MODULO",
            type: "input",
            message: "Nombre del modulo"
        },
        {
            name: "ORACLESERVICE",
            type: "confirm",
            message: "Usaremos un llamado a un procedimiento almacenado de oracle?"
        }
    ];

    return inquirer.prompt(answers);
}

const iniciar = () => {
    console.log(
        chalk.redBright(
        figlet.textSync("Claro Microservicios Nestjs CLI", {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
          })
        )
    );
}

const ejecutar = async() => {
    // Mostrar La informacion de la libreria en la cabecera
    iniciar();
    //Preguntas necesarias para crear la carpeta
    const response = await templateAnswer();
    const { PROYECTO, MODULO,  ORACLESERVICE } = response;
    console.log(response);
    // Creamos el proyecto cascaron
    const pathProyecto = createProject(PROYECTO, MODULO, ORACLESERVICE);
    // Promt de confirmacion
    createdProjectok(pathProyecto);
};

ejecutar();