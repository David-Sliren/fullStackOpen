export interface BmiQuery {
  heigth?: string,
  weight?: string
  
}


export interface ExerciseQuery {

  daily_exercises: number[],
  target: number
}