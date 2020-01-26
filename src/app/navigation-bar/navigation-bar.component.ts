import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  providers: [],
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  @Input() customElement: string;
  ngOnInit() {
    console.log(this.customElement);
  }
}

