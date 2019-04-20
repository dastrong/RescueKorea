import { useState, useEffect } from "react";

export default function useFormRequired(state, requiredValues) {
  const [isFormFilled, setIsFormFilled] = useState(state);

  useEffect(() => {
    const bool = requiredValues.every(req => !!state[req]);
    if (bool === isFormFilled) return;
    setIsFormFilled(bool);
  }, [state]);

  return isFormFilled;
}
