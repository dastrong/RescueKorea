import { useState } from "react";

export default function useFormStatus(initialStatus) {
  const [status, setStatus] = useState(initialStatus);

  return { status, setStatus };
}
