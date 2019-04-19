import { useState } from "react";

export default function useFormState(initialState, callback) {
  const [state, setState] = useState(initialState);
  const [isProcessing, setProcessing] = useState(false);

  const resetState = () => setState(initialState);

  const handleChange = (e, { name, value, checked }) =>
    setState({ ...state, [name]: value || checked });

  const handleSubmit = e => {
    e.preventDefault();
    setProcessing(true);
    callback();
  };

  return {
    state,
    isProcessing,
    setProcessing,
    handleChange,
    handleSubmit,
    resetState,
    setState,
  };
}
