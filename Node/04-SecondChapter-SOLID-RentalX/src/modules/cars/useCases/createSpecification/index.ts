import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecifitactionUseCase } from "./CreateSpecifitactionUseCase";

const categoriesRepository = CategoriesRepository.getInstance()

const createSpecifitactionUseCase = new CreateSpecifitactionUseCase(categoriesRepository)

const createSpecificationController = new CreateSpecificationController(createSpecifitactionUseCase)

export { createSpecificationController }
