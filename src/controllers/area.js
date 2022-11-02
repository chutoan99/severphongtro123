import * as areasService from "../services/area";

export const getAreas = async (req, res) => {
  try {
    const response = await areasService.getAreaService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at area controller: " + error,
    });
  }
};
