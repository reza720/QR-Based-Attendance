import User from '../src/modules/auth/model.js';
import sequelize from '../src/database/sequelize.js';

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import bcrypt from 'bcrypt';

const rl = readline.createInterface({ input, output });

try {
  await sequelize.authenticate();

  const username = (await rl.question('Username: ')).trim();
  const newPassword = await rl.question('New Password: ');

  const user = await User.findOne({
    where: {
      userName: username,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await user.update({
    passwordHash,
  });

  console.log('Password reset successfully');
} catch (err) {
  console.error(`Error: ${err.message}`);
} finally {
  rl.close();
  await sequelize.close();
}
