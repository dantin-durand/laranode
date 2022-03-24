import Db from "../../bootstrap/Db.js";
import response from "../../helpers/response.js";
import requestValidator from "../../helpers/validator.js";
import User from "../Models/User.js";
import UserRepository from "../Repository/UserRepository.js";

export default class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async index() {
    const userRepository = new UserRepository();
    const users = await userRepository.all();
    response(this.res, users, 200);
  }

  async show() {
    const id = this.req.url.split("/")[2];
    if (!Number(id)) return response(this.res, { error: "Invalid id" }, 400);

    const userRepository = new UserRepository();
    const users = await userRepository.get(id);

    if (!users) return response(this.res, { error: "User not found" }, 404);

    response(this.res, users, 200);
  }

  async post() {
    requestValidator(this.req, this.res, ["name", "email", "password"]);

    const userRepository = new UserRepository();
    const { body } = this.req;
    const user = new User(body.name, body.email, body.password);
    const users = await userRepository.create(user);

    response(this.res, users, 201);
  }

  async update() {
    requestValidator(this.req, this.res, ["name", "email", "password"]);
    const id = this.req.url.split("/")[2];
    if (!Number(id)) return response(this.res, { error: "Invalid id" }, 400);

    const userRepository = new UserRepository();
    const { body } = this.req;
    const user = new User(body.name, body.email, body.password);
    const userEdited = await userRepository.update(id, user);

    if (!userEdited) {
      return response(this.res, { error: "User not found" }, 404);
    }

    response(this.res, userEdited, 200);
  }

  async destroy() {
    const id = this.req.url.split("/")[2];
    if (!Number(id)) return response(this.res, { error: "Invalid id" }, 400);

    const userRepository = new UserRepository();
    const userDeleted = await userRepository.delete(id);

    if (!userDeleted) {
      return response(this.res, { error: "User not found" }, 404);
    }

    response(this.res, userDeleted, 200);
  }
}
