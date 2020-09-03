const miniKoa = require("./lib/application");

const app = new miniKoa();

let responseData = {};
app.use(async (ctx, next) => {
  responseData.name = "tom";
  await next();
  ctx.body = responseData;
});

app.use(async (ctx, next) => {
  responseData.age = 18;
  await next();
});

app.use(async (ctx, next) => {
  responseData.sex = "male";
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
