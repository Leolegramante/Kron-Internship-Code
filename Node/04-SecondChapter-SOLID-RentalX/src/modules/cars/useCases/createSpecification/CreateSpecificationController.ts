import { Request, Response } from "express";
import { CreateSpecifitactionUseCase } from "./CreateSpecifitactionUseCase";

class CreateSpecificationController {
  constructor(private createSpercificationUseCase: CreateSpecifitactionUseCase) { }

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    this.createSpercificationUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateSpecificationController }
