const mongoose = require('mongoose');
const { underline, green, red, yellow } = require('kleur');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log(underline(`${yellow('BASE DE DATOS')} ${green('ONLINE')}`));
    } catch (error) {
        console.log(red(error));
        throw new Error(red('Error en la base con datos'));
    }
};

module.exports = {
    dbConnection
};