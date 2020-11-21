import {Component, OnInit, ViewChild} from '@angular/core';
import {GetItemsService} from '../../services/get-items.service';
import {Item} from '../../../../models/cart';
import {IonInfiniteScroll, IonRange} from '@ionic/angular';
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
    this.activatedRoute.data.subscribe(data => {
      this.filtered = data.allItems;
      this.allItems = data.allItems;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  filterByName(value: string) {
    this.filtered = Object.assign([], this.allItems);
    this.filter = true;
    if (!value) {
      this.filter = false;
    }
    this.filtered = this.filtered.filter(
        item => item.itemName.toLowerCase().includes(value.toLowerCase())
    )
  }

  filterByPrice(lower: number, upper: number) {
    this.filtered = Object.assign([], this.allItems);
    this.filter = true;
    if (lower == 100 || upper == 0) {
      this.filter = false;
    }
    this.filtered = this.filtered.filter(
        item => item.price > lower && item.price < upper
    )
    }
}
