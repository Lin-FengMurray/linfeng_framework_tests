import { BasePage } from './BasePage.js';

export class NewsletterPage extends BasePage {
  constructor(page) {
    super(page);

    // ===== Newsletter (footer) =====
    this.newsletterEmailInput = page.locator('#newsletter-email');
    this.subscribeButton = page.locator('#newsletter-subscribe-button');
    this.subscriptionResult = page.locator('#newsletter-result-block');

    // ===== News list page =====
    this.newsTitleLinks = page.locator('.news-title a');
    this.newsItems = page.locator('.news-item');

    // ===== News detail page =====
    this.newsComments = page.locator('.comments');
    this.commentTitleInput = page.locator('#AddNewComment_CommentTitle');
    this.commentTextInput = page.locator('#AddNewComment_CommentText');
    this.newCommentButton = page.locator('.news-item-page .button-1.news-item-add-comment-button');
    this.commentSuccessResult = page.locator('.result');
  }

  // ===== Navigation =====

  async goToNewsPage() {
    await this.page.goto('https://demo.nopcommerce.com/news');
    // ✅ networkidle ensures all news items are fully rendered before interacting
    await this.page.waitForLoadState('networkidle');
  }

  async openNewsByTitle(title) {
    const link = this.page.locator('.news-title a', { hasText: title });
    await link.waitFor({ state: 'visible', timeout: 10000 });
    await link.click();
    // ✅ Wait for article page to fully load
    await this.page.waitForLoadState('networkidle');
  }

  async openFirstNewsItem() {
    await this.newsTitleLinks.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.newsTitleLinks.first().click();
    // ✅ Wait for article page to fully load
    await this.page.waitForLoadState('networkidle');
  }

  async getNewsItemsCount() {
    return await this.newsItems.count();
  }

  // ===== Newsletter =====

  async subscribe(email) {
    await this.newsletterEmailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.newsletterEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  // ✅ Returns locator directly — caller chains waitFor + expect
  getSubscriptionResult() {
    return this.subscriptionResult;
  }

  // ===== Comments =====

  async addComment({ title, comment }) {
    await this.commentTitleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.commentTitleInput.fill(title);
    await this.commentTextInput.fill(comment);
    await this.newCommentButton.click();
  }

  // ✅ Returns locator directly — caller chains waitFor + expect
  getCommentSuccessResult() {
    return this.commentSuccessResult;
  }
}