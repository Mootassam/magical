const STORAGE_KEY = 'cart_items';

export default class CartStorage {
  static get() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  static set(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items || []));
  }

  static clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
