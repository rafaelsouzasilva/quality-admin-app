const Redirect = ({ to = '/' }) => {
  window.location = to

  return false
}

export { Redirect }