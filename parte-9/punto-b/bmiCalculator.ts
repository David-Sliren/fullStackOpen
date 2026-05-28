import { toNumber } from './tools/convert.ts'

interface data {
  heigth: number;
  weight: number;
}

export const calculateBmi = ({ heigth, weight }: data): string => {
  const result = weight / heigth ** 2
  const formatResult = result.toFixed(2)

  switch (true) {
    case result < 18.5:
      return `Peso inferior al normal ${formatResult}`
    case result < 25.0:
      return `Peso Normal ${formatResult}`
    case result < 30:
      return `Peso superior al normal ${formatResult}`
    case result > 30:
      return `Obesidad ${formatResult}`
    default:
      return 'Corriga su info'
  }
}

console.log(
  'calculo: ',
  calculateBmi({
    heigth: toNumber(process.argv[2]),
    weight: toNumber(process.argv[3]),
  }),
)
