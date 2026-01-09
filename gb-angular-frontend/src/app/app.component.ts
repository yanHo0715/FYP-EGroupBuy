import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HelloWorldAngularonlyComponent} from './hello-world-angularonly/hello-world-angularonly.component';
import {
  HelloWorldAngularspringbootComponent
} from './hello-world-angularspringboot/hello-world-angularspringboot.component';

import {NgToastModule, ToasterPosition} from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appTitle = 'Project - X';
  protected readonly ToasterPosition = ToasterPosition;
}
