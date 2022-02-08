

# Shopping List
This is a full stack Shopping List application using Nx, React, Router, MUI, Styled Components, Express, and MySQL.

## Navigation
The `apps/api` directory houses the endpoints and DB access. The entry point is `api/src/main.ts`. <br>
The `apps/shopping-list` directory houses the front end. The entry point is `shopping-list/src/main.tsx`. <br>
The `libs/api-interfaces` directory houses the general interfaces to communicate between `api` and `shopping-list`. <br><br>

`tools` and `apps/shopping-list-e2e` are generated boilerplate structures and can be disregarded. Underlying MySQL and database structure was set up separately from this repo via a local Docker.

## Quick Start
Use `npm run start` for front end server and `npm run serve` for backend server.

## Screenshots
![image](https://user-images.githubusercontent.com/18517388/152923745-15c87898-ac76-4568-b1ed-039b8dc74ab8.png)

![image](https://user-images.githubusercontent.com/18517388/152923844-fe35382b-39f6-4177-b65a-5f79107fdbce.png)


## NX Command Reference

Run `nx g @nrwl/react:app my-app` to generate an application.<br>
Run `nx g @nrwl/react:lib my-lib` to generate a library.<br>
Run `nx serve my-app` for a dev server at http://localhost:4200/.<br>
Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.<br>
Run `nx build my-app` to build. Artifacts will be stored in `dist/`. `--prod` for production build.<br>
Run `nx graph` to see a diagram of the dependencies of your projects.<br>

### Tests
Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).<br>
Run `nx affected:test` to execute the unit tests affected by a change.<br>
Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).<br>
Run `nx affected:e2e` to execute the end-to-end tests affected by a change.<br>

### Reference
[Nx Documentation](https://nx.dev)
