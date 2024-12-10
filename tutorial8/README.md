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