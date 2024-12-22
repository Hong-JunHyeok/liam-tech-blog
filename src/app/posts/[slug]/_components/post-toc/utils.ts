export const getHeadingWithLevel = (heading: string) => {
  const headingPattern = /^(#+)\s+(.*)$/;

  const match = heading.match(headingPattern);
  if (!match) return { level: 0, title: "" };

  const level = match[1].length;
  const title = match[2].trim();

  return { level, title };
};

export const getHeadingList = (content: string) => {
  const headingPattern = /^(#+)\s+(.*)$/gm;
  const matchedHeadings = content.match(headingPattern);

  if (!matchedHeadings) return [];

  const headingsWithLevel = matchedHeadings.map(getHeadingWithLevel);

  const minLevel = Math.min(...headingsWithLevel.map(({ level }) => level));

  return headingsWithLevel.map(({ level, title }) => ({
    level: level - minLevel + 1,
    title,
  }));
};

export const moveToTitleTag = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;
  const position = targetElement.getBoundingClientRect();
  window.scrollTo({
    behavior: "smooth",
    left: position.left,
    top: position.top + window.scrollY - 60,
  });
};
