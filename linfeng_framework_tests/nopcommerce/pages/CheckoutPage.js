import { BasePage } from './BasePage.js';

// ✅ Extend BasePage for shared helpers
export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Step: Checkout as guest
    this.checkoutAsGuestBtn = page.locator('.checkout-as-guest-button');

    // Billing address
    this.firstNameInput = page.locator('#BillingNewAddress_FirstName');
    this.lastNameInput = page.locator('#BillingNewAddress_LastName');
    this.emailInput = page.locator('#BillingNewAddress_Email');
    this.countrySelect = page.locator('#BillingNewAddress_CountryId');
    this.cityInput = page.locator('#BillingNewAddress_City');
    this.address1Input = page.locator('#BillingNewAddress_Address1');
    this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueBtn = page.locator('#billing-buttons-container .new-address-next-step-button');

    // Shipping method
    this.shippingContinueBtn = page.locator('#shipping-method-buttons-container .shipping-method-next-step-button');

    // Payment method
    this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container .payment-method-next-step-button');

    // Payment info
    this.paymentInfoContinueBtn = page.locator('#payment-info-buttons-container .payment-info-next-step-button');

    // Confirm order
    this.confirmOrderBtn = page.locator('#confirm-order-buttons-container .confirm-order-next-step-button');

    // Result
    this.successMessage = page.locator('.section.order-completed .title');
  }

  async checkoutAsGuest() {
    await this.checkoutAsGuestBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.checkoutAsGuestBtn.click();
  }

  async fillBillingAddress(user) {
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.countrySelect.selectOption({ label: user.country });
    // ✅ Wait for state to trigger city/zip fields
    await this.cityInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.cityInput.fill(user.city);
    await this.address1Input.fill(user.address1);
    await this.zipInput.fill(user.zip);
    await this.phoneInput.fill(user.phone);
  }

  async continueBilling() {
    await this.billingContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.billingContinueBtn.click();
  }

  async continueShippingMethod() {
    await this.shippingContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingContinueBtn.click();
  }

  async continuePaymentMethod() {
    await this.paymentMethodContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentMethodContinueBtn.click();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentInfoContinueBtn.click();
  }

  async confirmOrder() {
    await this.confirmOrderBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmOrderBtn.click();
  }

  // ✅ Returns locator directly — caller can assert on it
  getSuccessMessage() {
    return this.successMessage;
  }
}