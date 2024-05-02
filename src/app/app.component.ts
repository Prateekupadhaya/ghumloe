import { CommonService } from './common.service';
import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MatProgressBarModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ghumloe';
  loading:boolean = false
  subscriptions: any = [];

  constructor(
    private router: Router,
    private commonService: CommonService
  ) {
  const routeSubscription = this.router.events.subscribe((event: Event) => {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
  this.subscriptions.push(routeSubscription);
  }

  ngOnDestroy() {
    this.commonService.preComponentDestroyTasks(this.subscriptions);
  }
}
