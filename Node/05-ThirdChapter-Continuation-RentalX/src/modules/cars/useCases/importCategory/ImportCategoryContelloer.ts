import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importcategoryUseCase: ImportCategoryUseCase) {

  }
  handle(request: Request, response: Response): Response {
    const { file } = request

    this.importcategoryUseCase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }
