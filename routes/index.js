import UserController from "../app/Controllers/UserController.js";
import Router from "../bootstrap/Router.js";
import { bodyParser } from "../helpers/bodyParser.js";
import response from "../helpers/response.js";
async function router(req, res) {
  const router = new Router(req, res);

  await router.get("/users", async (req, res) => {
    const userController = new UserController(req, res);
    await userController.index();
  });

  await router.get("/users/:id", async (req, res) => {
    const userController = new UserController(req, res);
    await userController.show();
  });

  await router.post("/users", async (req, res) => {
    const userController = new UserController(req, res);
    await userController.post();
  });

  await router.put("/users/:id", async (req, res) => {
    const userController = new UserController(req, res);
    await userController.update();
  });

  await router.delete("/users/:id", async (req, res) => {
    const userController = new UserController(req, res);
    await userController.destroy();
  });

  router.remainder();
}

export default router;
