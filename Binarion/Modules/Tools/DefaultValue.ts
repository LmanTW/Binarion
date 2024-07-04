// Default Value
export default <Type> (value: undefined | Type, defaultValue: Type): Type => {
  return (value === undefined) ? defaultValue : value
}
