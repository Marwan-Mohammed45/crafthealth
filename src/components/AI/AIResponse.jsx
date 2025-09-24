import { useEffect, useState } from "react";
import TextLayout from "./textLayout";
export default function TypewriterStatic(props) {
  const fullText = props.text;
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index, fullText]);

  return (
    <div className="font-mono">
      <TextLayout>
        <span>{displayed}</span>
        {!done && <span className="animate-pulse">|</span>}
      </TextLayout>
    </div>
  );
}

