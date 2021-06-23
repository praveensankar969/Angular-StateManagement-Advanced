import {Component, OnInit} from '@angular/core';
import { LoadingService } from './loading/loading.services';
import { MessagesService } from './messages/messages.service';
import { AuthService } from './services/auth.services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent implements  OnInit {

    constructor(public authService : AuthService) {

    }

    ngOnInit() {


    }

  logout() {
    this.authService.Logout();
  }

}
