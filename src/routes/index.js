import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import areaRouter from "./area";
import priceRouter from "./price";
import provinceRouter from "./province";
import userRouter from "./user";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/currentUser", userRouter);

  // nếu không lọt vào các routes trên thì sẽ lọt vào routes này
  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
