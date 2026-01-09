import {Component, OnInit} from '@angular/core';
import {HelloWorldAngularspringbootService} from '../services/hello-world-angularspringboot.service';

@Component({
  selector: 'app-hello-world-angularspringboot',
  imports: [],
  templateUrl: './hello-world-angularspringboot.component.html',
  styleUrl: './hello-world-angularspringboot.component.scss'
})

export class HelloWorldAngularspringbootComponent implements OnInit{

  contentFromSpringBoot?: string;

  constructor(private helloWorldAngularspringbootService:HelloWorldAngularspringbootService ) { }

  ngOnInit() {

    this.helloWorldAngularspringbootService.getServerMessage().subscribe({
      next: data => {
        this.contentFromSpringBoot = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.contentFromSpringBoot = res.message;
          } catch {
            this.contentFromSpringBoot = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.contentFromSpringBoot = `Error with status: ${err.status}`;
        }
      }
    });
  }
}

