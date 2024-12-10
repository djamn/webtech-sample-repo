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
### Backend
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
### Frontend
- Create new Angular (>=17) application: ``ng new <name>``
  - Select CSS
  - Choose between SSR and SSG (https://www.telerik.com/blogs/angular-basics-ssr-ssg-partial-hydration-angular-18)
  - (Optional) Using tailwindCSS for much easier style implementation: https://tailwindcss.com/
    - ``npm install -D tailwindcss``
    - ``npx tailwind init``
    - In tailwind.config.js define the following structure
      ```js
      module.exports = {
        content: ["./src/**/*.{html,js}"],
        theme: {
          extend: {},
        },
        plugins: [],
      }
      ```
- **Additional changes for our example:**
  - Creating child components with: ``ng g c /components/bikes`` and ``ng g c /components/bike``
  - Creating page component (optional) with: ``ng g c /pages/bikes`` (Here: not necessary but good abstraction when using navbar & footer)
    - Add all components you need into the page component. The page gets displayed.
  - **Routing**
    - In **app.routes** you can set specific routes: ``{path: '', component: BikesComponent},``
  - Now we set that our **app.component.html** will use the router-outlet to handle routes: ``<router-outlet></router-outlet>`` (app.component.html)
  - Now we define an interface for our bikes: ``ng g i /types/bike``
    - Here we define all fields, that bike can have (see database schema)
    - Here: ``bike_id, bike_name, is_avaiable, size, price``
  - Creating Service: ``ng g s /services/bikes``
    - Connect service with your components (see Angular guide or example)
  - Using **HTTPClient** to execute REST queries and handling requests by using observables.

# Execution
- Start **pgAdmin/postgres** and **Docker Desktop**
- Create and populate database tables with ``docker-compose up -d``
- Check out /backend folder
    - Start backend with **node server.js**
- Check out to /frontend folder
    - Start frontend with **ng serve --open**