import ApiResponseHandler from "../apiResponseHandler";
import ProductCategoryService from "../../services/productCategoryService";

export default async (req, res, next) => {
  try {
    const payload = await ProductCategoryService.findAndCountAll(
      { ...req.query, orderBy: req.query.orderBy || "name_ASC" },
      req
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
