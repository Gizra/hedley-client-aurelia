import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Config} from '../config/config';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Config, EventAggregator, HttpClient, Router)
export class Login {

  // Default credentials.
  credentials = {
    username: 'demo',
    pass: '1234'
  }

  constructor(config, eventAggregator, http, router) {
    this.config = config;
    this.eventAggregator = eventAggregator;
    this.http = http;
    this.router = router;
  }

  get canLogin() {
    return this.credentials.username && this.credentials.pass && !this.http.isRequesting;
  }

  login() {
    var credentials = this.credentials;
    // Convert to base64.
    var base64 = window.btoa(credentials.username + ':' + credentials.pass);

    this.eventAggregator.subscribe('user_login', payload => {
      console.log('user logged');
      console.log(payload);
    });

    return this.http
      .configure(x => {
        x.withBaseUrl(this.config.backendUrl);
        x.withHeader('Authorization', 'Basic ' + base64);
      })
      .get('api/login-token')
      .then(response => {
        // Add access token to the localStorage.
        var accessToken = JSON.parse(response.response).access_token;
        localStorage.setItem('access_token', accessToken);

        console.log('ok');

        // Notify user has logged in.
        this.eventAggregator.publish('user_login', JSON.parse(response.response));

      });
  }
}
