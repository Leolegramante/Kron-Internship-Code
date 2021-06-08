import { Request, Response } from 'express'
import CreateCoursesService from './createCourseService'


export function createCourse(request: Request, response: Response) {
  CreateCoursesService.execute({
    name: 'NodeJS',
    educator: 'Professor 1',
    duration: 10
  })

  CreateCoursesService.execute({
    name: 'ReactJS',
    educator: 'Professor 2'
  })

  return response.send()
}
