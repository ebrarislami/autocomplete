export const getHighlightedText = (text: string, highlight: string) => {
  const highlightStyle = {
    fontWeight: "bold",
    backgroundColor: "var(--highlight-color)",
  };
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase() ? highlightStyle : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};
