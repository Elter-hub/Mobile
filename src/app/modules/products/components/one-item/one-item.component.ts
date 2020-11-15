import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../../models/cart';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.scss'],
})
export class OneItemComponent implements OnInit {
  @Input() item: Item;
  constructor(private router: Router,
              private navsParam: NavParams,
              public modalController: ModalController,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.navsParam.get('item'));
    this.item = this.navsParam.get('item');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
