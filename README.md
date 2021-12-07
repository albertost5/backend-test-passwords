# backend-test-passwords

_Project to validate passwords and check if they are compromised or not._

## Installation 🔧

1. Execute npm install.
2. Execute the sql/sqldump.sql in your db.
3. Set the .env file in the root of the project with the the configuration needed (PORT, PORT_COMPROMISED, HOST, DB_HOST, DB_USER, DB_PASSWORD and DATABASE).
4. Download and run the docker image.
   - Pull the image using docker desktop for instance.
   - Execute, docker run -p 5000:5000 --rm -d --name customName imageName, to run the API and put it in the port that is given.
   - Once we finish testing the project we can remove the container running: docker container rm -f id/customName
5. Once that we configured and set up the project, we can start using the npm scripts defined.

- serve, run the project in the port specified (by default 3000).
- build, compile the TS files to JS, taking as reference the tsconfig.
- start, run the project taking the config folder as reference.
- copy:all | copy:config , copy the config folder to dist/config.
- lint, execute the linter (ESLint) and the code formatter (Prettier).
- lint-fix, try to fix automatically some errors flagged.
- script, execute the escript.

To test the project is recommendable to run the linter's script if there are something flagged at the start and then run => npm run serve (API running) => npm run script
