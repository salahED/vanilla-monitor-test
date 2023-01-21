class HttpClient {
  // # pour dire que c'est methode privé
  async #fetch(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error `);
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
