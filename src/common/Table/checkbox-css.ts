const getStyleByClass = (classname: string, pseudoElement?: string) => {
  const selectedQuery = document.querySelector(`.${classname}`);
  let style;
  if (selectedQuery) {
    style = getComputedStyle(
      selectedQuery,
      pseudoElement ? `:${pseudoElement}` : null
    );
  }
  return style;
};

export default getStyleByClass;
