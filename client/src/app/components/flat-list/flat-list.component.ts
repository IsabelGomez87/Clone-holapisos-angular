import { environment } from './../../../environments/environment.prod';
import { Flat } from './../../core/models/flat';
import { Component, OnInit } from '@angular/core';
import { FlatService } from 'src/app/core/services/flat.service';


@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.scss']
})
export class FlatListComponent implements OnInit {
  flats: Flat[] = [];
  private flatsUrl = environment.flatsUrl;
  nextUrl: string = '';

  constructor(private flatService: FlatService) { }

  ngOnInit(): void {
    this.showFlats(this.flatsUrl);
  }

  showFlats(url: string): void {
    this.flatService.getFlats(url)
    .subscribe((apiData) => {
      this.flats = [...this.flats, ...apiData.data];
      this.nextUrl = apiData.links.next.href
    });
  }
}

