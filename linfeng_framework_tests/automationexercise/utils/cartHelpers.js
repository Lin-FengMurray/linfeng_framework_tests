// utils/cartHelpers.js
// Cart utility — use clearCart() as a beforeEach guard in quantity-sensitive tests.
// Required by: same_product_added_twice_aggregates_quantity, add_product_with_custom_quantity_from_detail,
//              cart_is_empty_after_removing_only_item, cart_contents_persist_after_page_reload

export async function clearCart(page) {
  await page.goto('/view_cart');
  const deleteButtons = page.locator('a.cart_quantity_delete');
  while (await deleteButtons.count() > 0) {
    await deleteButtons.first().click();
    await page.waitForLoadState('networkidle');
  }
}
