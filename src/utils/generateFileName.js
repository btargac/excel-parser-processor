const extensionRegex = /\.([a-zA-Z0-9]+)$/ig

export default (name, extension) => {
  const hasExtension = name.match(extensionRegex);

  return hasExtension ? name: `${name}.${extension}`;
}
