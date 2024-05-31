import 'dotenv/config';
import chalk from 'chalk';

import app from './app';

app.listen(process.env.APP_PORT, () => {
    console.log(chalk.bgGreen(`Server is running at port ${process.env.APP_PORT}`));
});
