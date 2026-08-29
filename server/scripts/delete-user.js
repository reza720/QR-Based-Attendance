import sequelize from "../src/database/sequelize.js";
import User from "../src/modules/auth/model.js";

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({input, output});

try{
    await sequelize.authenticate();

    const username = (await rl.question("Username: ")).trim();
    const user = await User.findOne({
        where:{
            userName:username
        }
    });
    
    if(!user){
        throw new Error("User not found");
    }

    await user.destroy();

    console.log("User deleted");
}
catch(err){
    console.error(`Error: ${err.message}`);
}
finally{
    rl.close();
    await sequelize.close();
}