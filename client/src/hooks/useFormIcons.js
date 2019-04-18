import { useState, useEffect } from "react";

// returns [iconName, iconColor]
export default function useFormIcons(comparer, initialVals, successVals) {
  const [name, setName] = useState(initialVals.name);
  const [color, setColor] = useState(initialVals.color);

  useEffect(() => {
    setName(comparer ? successVals.name : initialVals.name);
    setColor(comparer ? successVals.color : initialVals.color);
  }, [comparer]);

  return [name, color];
}
