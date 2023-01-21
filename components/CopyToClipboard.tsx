export const CopyToClipboard: IComponent<{
  text: string;
}> = ({ children, text }) => {
  return (
    <button onClick={() => navigator.clipboard.writeText(text)}>
      {children}
    </button>
  );
};
