export const groupPagesByLocale = markdown => {
  return markdown.reduce((pagesByLocale, {
    node
  }) => {
    const locale = node.frontmatter.locale;
    pagesByLocale[locale] = node;

    return pagesByLocale;
  }, {})
}


// const trimPath = str => {
//   const lastDirectoryIndex = str.lastIndexOf('/') + 1;
//   const trimCount = -(str.length - lastDirectoryIndex);

//   return str.slice(0, trimCount)
// }