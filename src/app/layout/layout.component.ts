import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  public timeout;
  public routerChanged = true;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = true;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = false;
        }, 1000);
      }
    });
  }
  public ShowLoading(): void {
    this.routerChanged = true;
  }

  public StopLoading(): void {
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      this.routerChanged = false;
    }, 1000);
  }

  ngOnInit(): void {
  }


}
