class HttpClient {
  async #fetch(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  /**
   *
   * @param {string} url
   * @param {FetchOptions} options
   * @returns
   */
  async get(url, options = {}) {
    return this.#fetch(url, { method: "GET", ...options });
  }
}

export const httpClient = new HttpClient();
