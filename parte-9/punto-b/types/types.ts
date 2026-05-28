import { Request } from 'express'
import  {ExerciseQuery, type BmiQuery} from '../interfaces/interfaces'

export type BmiType = Request<unknown, unknown, unknown, BmiQuery>

export type ExerciseType = Request<unknown, unknown, ExerciseQuery, unknown>
