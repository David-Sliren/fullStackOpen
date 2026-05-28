// import { toNumber } from './tools/convert.ts'

interface dataReturn {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: 1 | 2 | 3;
  average: number;
}

export const exerciseCalculator = (
  hoursTrained: number[],
  fullTarget: number,
): dataReturn => {
  const fullHoursTrained = hoursTrained.length
  const fullTrainingDays = hoursTrained.filter((a) => a !== 0).length
  const isSucess = hoursTrained.every((a) => a >= 6)
  const fullAverage =
    hoursTrained.reduce((acc, b) => acc + b, 0) / fullHoursTrained
  return {
    periodLength: fullHoursTrained,
    trainingDays: fullTrainingDays,
    success: isSucess,
    rating: fullTarget,
    ratingDescription: isSucess
      ? 'congratulations for your achievement'
      : 'not too bad but could be better',
    target: isSucess ? 3 : 2,
    average: fullAverage,
  }
}

// const argv: number[] = JSON.parse(process.argv[2])
// const argv2: number = toNumber(process.argv[3])

// console.log()

// console.log(exerciseCalculator(argv, argv2))
