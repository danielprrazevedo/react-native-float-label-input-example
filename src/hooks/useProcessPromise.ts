import { useCallback, useState } from "react";

function useProcessPromise<T extends Array<unknown>, U = unknown>(
  promise: (...params: T) => Promise<U>
) {
  const [processing, setProcessing] = useState(false);
  const callback = useCallback(async (...params: T) => {
    try {
      setProcessing(true);
      return await promise(...params);
    } finally {
      setProcessing(false);
    }
  }, []);

  return Object.assign(callback, { processing });
}

export default useProcessPromise;
