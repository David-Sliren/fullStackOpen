import express from 'express'

import { calculateBmi } from './bmiCalculator.ts'
import { toNumber } from './tools/convert.ts'
import { BmiType, ExerciseType } from './types/types.ts'
import { exerciseCalculator } from './exerciseCalculator.ts'

const PORT = 3001

const app = express()

app.use(express.json())

// Get
app.get('/', (_req, res) => {
  res.status(200).json('hello world')
})

app.get('/hello', (_req, res) => {
  res.status(200).json('hello FullStack Open')
})

app.get('/bmi', (req : BmiType, res) => {
  console.log(req.query)

  const {heigth, weight} = req.query

  try {
    if (!heigth || !weight) throw new Error('malformatted parameters')

    const heigthToNumber = toNumber(heigth)
    const weightToNumber = toNumber(weight)

    const data = calculateBmi({
      heigth: heigthToNumber,
      weight: weightToNumber,
    })
    res.status(200).json({ message: data })
  } catch (error) {
    res.status(404).json({ error: `malformatted parameters ${error}` })
  }
})


// Post

app.post('/exersice',  (req: ExerciseType, res) => {
const {daily_exercises, target} = req.body

if( !Array.isArray(daily_exercises)  || typeof target !== 'number')return res.status(404).json({error: 'parameters missing'})

 const data = exerciseCalculator(daily_exercises, target)

  return res.status(200).json({data})
  
})

app.listen(PORT, () => console.log(`listen en port ${PORT}`))
