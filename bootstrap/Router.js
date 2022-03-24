import response from "../helpers/response.js";

export default class Router {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.methods = [];
  }

  async get(url, callback) {
    if (!this.methods.includes("GET")) this.methods.push("GET");
    if (this.#check(url, "GET")) await callback(this.req, this.res);
  }

  async post(url, callback) {
    if (!this.methods.includes("POST")) this.methods.push("POST");
    if (this.#check(url, "POST")) await callback(this.req, this.res);
  }

  async put(url, callback) {
    if (!this.methods.includes("PUT")) this.methods.push("PUT");
    if (this.#check(url, "PUT")) await callback(this.req, this.res);
  }

  async delete(url, callback) {
    if (!this.methods.includes("DELETE")) this.methods.push("DELETE");
    if (this.#check(url, "DELETE")) await callback(this.req, this.res);
  }

  remainder() {
    if (!this.res.writableEnded) {
      if (!this.methods.includes(this.req.method)) {
        response(this.res, { error: "Method not allowed" }, 405);
      } else {
        response(this.res, { error: "File not found" }, 404);
      }
    }
  }

  #check(url, method) {
    if (this.req.method !== method) return false;
    if (url.includes(":")) {
      const urlParts = url.split(":");
      const urlPart = urlParts[0];
      if (this.req.url.includes(urlPart)) return true;
    }
    if (this.req.url === url) return true;
    return false;
  }
}
