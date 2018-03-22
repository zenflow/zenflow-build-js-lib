const foo = async () => 'bar'

const bar = [1, 2, 3].includes(2)

export const random = {
  ...{ foo },
  ...{ bar },
}
