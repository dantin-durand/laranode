import response from "./response.js";

export default function requestValidator(req, res, requiredFields) {
  const body = req.body;
  let missingFields = [];
  requiredFields.forEach((field) => {
    if (!body[field]) missingFields.push(field);
  });

  if (missingFields.length > 0) {
    response(
      res,
      { error: `Missing fields: ${missingFields.join(", ")}` },
      422
    );
    return;
  }
}
