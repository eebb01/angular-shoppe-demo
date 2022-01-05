import { Component, OnInit, HostListener } from '@angular/core';
import { CartService } from 'src/app/services';
import { Product } from 'src/app/models';
import { Observable } from 'rxjs';
import * as FullStory from '@fullstory/browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items$: Observable<Product[]>;
  displayedColumns: string[] = ['removeAction', 'name', 'quantity', 'cost'];
  totalCost: number = 0;

  constructor(private cartService: CartService) {

  }

  @HostListener('fullstory/rageclick', ['$event'])
  rageclick(event: CustomEvent) {
    FullStory.log('Rage event is called');
    console.log("Rage justified!");
    //submit it to product channel for quick updates
  }

  ngOnInit() {
    this.initDataSource();
    this.initCalculator();
  }

  /**
   * Initialize the MatTable's datasource.
   */
  private initDataSource(): void {
    this.items$ = this.cartService.getItems();
  }

  /**
   * Based on items in the cart, calculate things (e.g. totals, quantities, etc).
   */
  private initCalculator(): void {
    // add an observer to the cart's items and compute the total cost
    this.items$.subscribe(() => {
      this.totalCost = this.cartService.calculateTotalCost();
    });
  }

  /**
   * Removes an item from the cart entirely.
   * @param item the Product item to be removed
   */
  removeItem(item: Product): void {
    const { id } = item;
    this.cartService.removeItem(id);
    FullStory.event('RemoveProduct',{title: item.title, id:item.id, price:item.price, qty: item.quantity});
  }

}
