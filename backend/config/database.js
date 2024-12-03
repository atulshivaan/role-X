import { Sequelize } from "sequelize";

const db = new  Sequelize('mera2','root','',{
    host:"localhost",
    dialect:"mysql"

})

export default db;