export function buildBlockOfElements(li, span, button) {
  li.setAttribute("class", "location-wrapper");
  span.setAttribute("title", "Choose");
  button.setAttribute("class", "lnr lnr-cross");
  button.setAttribute("title", "Remove from favorites");
  const newBlock = li;
  li.append(span, button);
  return newBlock;
}

export const ELEMENTS_STYLE = {
  SELECTED: "location-wrapper-selected",
  UNSELECTED: "location-wrapper",
}
