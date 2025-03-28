import toast from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  content: string;
  successText: string;
};

export const CopyToClipboard = (props: Props) => {
  const { children, content, successText } = props;
  const handleClick = () => {
    // Play sound effect
    const audio = new Audio("/copy.mp3");
    void audio.play();

    void navigator.clipboard.writeText(content);
    toast.success(successText);
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="cursor-copy" onClick={handleClick}>
      {children}
    </div>
  );
};
