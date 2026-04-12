// api/clients/AutomationExerciseApiClient.js
// Wraps Playwright's native request context for automationexercise.com API.
// Uses form: key for application/x-www-form-urlencoded — never axios or node-fetch.

const BASE_URL = 'https://automationexercise.com/api';

export class AutomationExerciseApiClient {
  constructor(request) {
    this.request = request;
  }

  // ── Products ──────────────────────────────────────────────────────────────

  async getProducts() {
    const res = await this.request.get(`${BASE_URL}/productsList`);
    return { status: res.status(), body: await res.json() };
  }

  async searchProduct(searchTerm) {
    const res = await this.request.post(`${BASE_URL}/searchProduct`, {
      form: { search_product: searchTerm },
    });
    return { status: res.status(), body: await res.json() };
  }

  async searchProductMissingParam() {
    const res = await this.request.post(`${BASE_URL}/searchProduct`);
    return { status: res.status(), body: await res.json() };
  }

  async postToProducts() {
    const res = await this.request.post(`${BASE_URL}/productsList`);
    return { status: res.status(), body: await res.json() };
  }

  // ── Brands ────────────────────────────────────────────────────────────────

  async getBrands() {
    const res = await this.request.get(`${BASE_URL}/brandsList`);
    return { status: res.status(), body: await res.json() };
  }

  async putToBrands() {
    const res = await this.request.put(`${BASE_URL}/brandsList`);
    return { status: res.status(), body: await res.json() };
  }

  // ── Auth ──────────────────────────────────────────────────────────────────

  async verifyLogin(email, password) {
    const res = await this.request.post(`${BASE_URL}/verifyLogin`, {
      form: { email, password },
    });
    return { status: res.status(), body: await res.json() };
  }

  async verifyLoginViaDelete(email, password) {
    const res = await this.request.delete(`${BASE_URL}/verifyLogin`, {
      form: { email, password },
    });
    return { status: res.status(), body: await res.json() };
  }

  async verifyLoginWithoutEmail(password) {
    const res = await this.request.post(`${BASE_URL}/verifyLogin`, {
      form: { password },
    });
    return { status: res.status(), body: await res.json() };
  }

  // ── Account lifecycle ─────────────────────────────────────────────────────

  async createAccount(user) {
    const res = await this.request.post(`${BASE_URL}/createAccount`, {
      form: {
        name:          user.name,
        email:         user.email,
        password:      user.password,
        title:         user.title,
        birth_date:    user.birthDay,
        birth_month:   user.birthMonth,
        birth_year:    user.birthYear,
        firstname:     user.firstName,
        lastname:      user.lastName,
        company:       user.company,
        address1:      user.address1,
        address2:      user.address2,
        country:       user.country,
        zipcode:       user.zipcode,
        state:         user.state,
        city:          user.city,
        mobile_number: user.mobileNumber,
      },
    });
    return { status: res.status(), body: await res.json() };
  }

  async updateAccount(user) {
    const res = await this.request.put(`${BASE_URL}/updateAccount`, {
      form: {
        name:          user.name,
        email:         user.email,
        password:      user.password,
        title:         user.title,
        birth_date:    user.birthDay,
        birth_month:   user.birthMonth,
        birth_year:    user.birthYear,
        firstname:     user.firstName,
        lastname:      user.lastName,
        company:       user.company,
        address1:      user.address1,
        address2:      user.address2,
        country:       user.country,
        zipcode:       user.zipcode,
        state:         user.state,
        city:          user.city,
        mobile_number: user.mobileNumber,
      },
    });
    return { status: res.status(), body: await res.json() };
  }

  async deleteAccount(email, password) {
    const res = await this.request.delete(`${BASE_URL}/deleteAccount`, {
      form: { email, password },
    });
    return { status: res.status(), body: await res.json() };
  }

  async getUserByEmail(email) {
    const res = await this.request.get(`${BASE_URL}/getUserDetailByEmail`, {
      params: { email },
    });
    return { status: res.status(), body: await res.json() };
  }

  async getUserWithoutEmail() {
    const res = await this.request.get(`${BASE_URL}/getUserDetailByEmail`);
    return { status: res.status(), body: await res.json() };
  }
}
