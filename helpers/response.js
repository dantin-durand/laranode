export default function response(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.write(JSON.stringify(data));
  res.end();
}
