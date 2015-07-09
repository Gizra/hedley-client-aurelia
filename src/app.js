import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

import {AuthorizeStep} from './pipeline/authorize-step';

console.log(AuthorizeStep);

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';

    // Add a route filter to the authorize extensibility point.
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      {
        route: ['','welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: true,
        title:'Welcome'
      },
      {
        route: 'login',
        name: 'login',
        moduleId: './login',
        nav: true,
        title: 'Login'
      },
      {
        route: 'my-account',
        name: 'my-account',
        moduleId: './my-account',
        nav: true,
        title: 'My Account'
      },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
