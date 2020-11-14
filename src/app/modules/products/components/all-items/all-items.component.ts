import {Component, OnInit, ViewChild} from '@angular/core';
import {GetItemsService} from '../../services/get-items.service';
import {Item} from '../../../../models/cart';
import { IonInfiniteScroll } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss'],
})
export class AllItemsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  allItems: Item[];
  types = ['WHISKEY', 'LIQUOR', 'ROM', 'BRANDY', 'VODKA', 'ABSENT']
  filtered: Item[];
  filter = false;

  constructor(private getItemService: GetItemsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemService.getAllItems().subscribe(data => {
      console.log(data);
      this.filtered = data;
      this.allItems = data
    }, error => {
      console.log(error);
    })

    this.activatedRoute.data.subscribe(data => console.log(data))
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == this.allItems.length) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
