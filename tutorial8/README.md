# Instruction
## Required
- **Backend** (npm i for dependencies in /backend)
    - Node >= v20.17.0
    - NPM >= v10.2.3
- **Frontend** (npm i for dependencies in /frontend)
    - Angular >= 17
- **Database**
    - Docker Desktop
    - PostgreSQL > 15
    - PgAdmin 4
## Backend
- Install dependencies (``npm i ``)
- Create Express app
- Connect Express app with Postgres Database
- Define authentication to prevent accessing specific routes without authorization (not in this example)
### Database
- You can create a SQL script like in the previous assignments and import it using psql or PgAdmin
- Another approach: **Docker Compose**
  - Needed: **Docker Desktop**  (has to run in background)
  - Specify ``docker-compose-yml`` structure & database handling (here in initdb folder)
  - Populate database using: ``docker-compose up -d``
  - Delete database: ``docker-compose down -v``
- In this example you have to manually create a database in pgAdmin:
  - Database Hostname/address: **localhost**
  - Database Port: **5433**
  - Database Username: **postgres**
  - Add new PostgresSQL database in this server:
    - Database Name: **postgres**
    - Database Password: **postgres**

- ng new frontend -> CSS ->
- SSR / SSG (vor nachteile todo)

Installing tailwind (todo)

Create model folder for type -> Bike

Creating child components with ng g c /components/bikes and bike
Creating page component (optional) with ng g c /pages/bikes
Combine everything in the page - Here it is only the component, but otherwise we also have navbar and footer.

Routing:
In app.config: (already existing)
```typescript
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
 providers: [ ... , provideRouter(routes)]
};
```

In app.routes you can set specific routes
    {path: '', component: BikesComponent},


Now we set that our app.component.html will use the router-outlet to handle routes:
``<router-outlet></router-outlet>`` (app.component.html)

Now we define an interface for our bikes:
ng g i /types/bike

Here we define all fields, that bike can have (see database schema)
TODO


Creating Service
ng g s /services/bikes

```
@Injectable
export class BikeService { }
```

In the components:
```
import {BikeService} from "./services/bike.service";
@Component({
 providers: [BikeService]
})
```

By using REST we need obserables (subscribe)
TODO also using specific dependencies

# Execution
- Start pgAdmin/postgres and Docker Desktop
- Create and populate database tables with ``docker-compose up -d``
- Check out /backend folder
    - Start backend with **node server.js**
- Check out to /frontend folder
    - Start frontend with **ng serve --open**