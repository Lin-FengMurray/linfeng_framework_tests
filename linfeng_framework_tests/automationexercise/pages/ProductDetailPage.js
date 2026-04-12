// pages/ProductDetailPage.js

import { BasePage } from './BasePage.js';

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName  = page.locator('.product-information h2');
    this.price        = page.locator('.product-information span span');
    this.brand        = page.locator('.product-information p').filter({ hasText: 'Brand:' });
    this.availability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
    this.condition    = page.locator('.product-information p').filter({ hasText: 'Condition:' });
    this.quantity     = page.locator('#quantity');
    this.addToCartBtn = page.locator('button.cart').first();
    this.reviewName   = page.locator('#name');
    this.reviewEmail  = page.locator('#email');
    this.reviewText   = page.locator('#review');
    this.reviewSubmit = page.locator('#button-review');
    this.reviewSuccess = page.locator('.alert-success').first();
  }
}
