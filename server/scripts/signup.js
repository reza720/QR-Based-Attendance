import sequelize from '../src/database/sequelize.js';
import User from '../src/modules/auth/model.js';

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import bcrypt from 'bcrypt';

const rl = readline.createInterface({ input, output });

try {
  await sequelize.authenticate();

  const username = (await rl.question('Username: ')).trim();
  const password = await rl.question('Password: ');

  const existingUser = await User.findOne({
    where: { userName: username },
  });
  if (existingUser) {
    throw new Error('User already exist');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    userName: username,
    passwordHash,
  });

  console.log(`User signed up successfully with ${username} username`);
} catch (err) {
  console.error(`Error: ${err.message}`);
} finally {
  rl.close();
  await sequelize.close();
}
