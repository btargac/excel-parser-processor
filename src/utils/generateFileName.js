const extensionRegex = /\.([a-zA-Z0-9]+)$/ig
const trailingDotRegex = /\.$/g

const trimTrailingDot = name => {
  const hasTrailingDot = trailingDotRegex.test(name);

  return hasTrailingDot ? name.replace(trailingDotRegex, '') : name;
}

export default (name, extension) => {
  const hasExtension = name.match(extensionRegex);
  name = trimTrailingDot(name);

  return hasExtension ? name: `${name}.${extension}`;
}
