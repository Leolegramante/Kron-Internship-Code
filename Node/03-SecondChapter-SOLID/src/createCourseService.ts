/**
 * name - string
 * duration - number
 * educator - string
 */

interface CourseProps {
  name: string
  duration?: number
  educator: string
}

class CreateCoursesService {
  execute({ name, duration = 8, educator }: CourseProps) {
    console.log(name, duration, educator)
  }
}

export default new CreateCoursesService()
