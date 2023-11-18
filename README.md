## How to install Medusa Backend
1. Open any terminal, then type the command: git clone https://github.com/alvika31/my-medusa-store.git
2. when finished, open the terminal and type: npm install
3. Once done, open PgAdmin 4 or anything to manage postgresSQL, then create a new database.
4. Configure the database name and database password in .env and datasource.js with the database name and password created.
5. after that in the terminal type the command: npm run build and npx medusa migrations run
6. If there is an error (0, modules_sdk_1.registerModules) is not a function, then in the root directory, package.json change the version @medusajs/medusa to version "1.17.4" then type the command: npm install
7. type the command again: npm run build and npx medusa migrations run
8. After that type the command: npm install and the command: npm run dev
9. When finished type the command: npm run dev to run the backend server and admin dashboard
backend: localhost:9000
dashboard admin: localhost:7001

10. The API documentation is at: localhost:9000/store/api-docs

