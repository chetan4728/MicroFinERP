import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-layout',
  templateUrl: './superlayout.component.html',
})
export class SuperLayoutComponent implements OnInit {
  public timeout;
  public routerChanged = true;
  constructor(public local: LocalStorageService, private router: Router) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = true;
        if (this.local.get(environment.userSession) === null)
        {
          window.location.href = '/';
        }
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
    if (this.local.get(environment.userSession) === null)
    {
      window.location.href = '/';
    }

  }


}
