import * as authService from "../services/auth";

export const register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    // nếu nhập thiếu 1 trong 3 trường
    if (!name || !phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing input !",
      });
    // ngược lại
    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fair at with controller:" + error,
    });
  }
};
export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing input !",
      });
    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fair at with controller:" + error,
    });
  }
};
