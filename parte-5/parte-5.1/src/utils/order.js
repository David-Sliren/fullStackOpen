export const order = (values) => {
  try {
    if (!values) throw new Error('hubo un Error en el sort')

    return values.sort((a, b) => b.likes - a.likes)
  } catch (error) {
    console.log(error)
  }
}
