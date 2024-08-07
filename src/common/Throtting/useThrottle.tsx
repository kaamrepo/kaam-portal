import { useCallback, useRef } from "react";

type Callback<T extends any[]> = (...args: T) => void;

export function useThrottle<T extends any[]>(
  callback: Callback<T>,
  delay: number
) {
  const lastCall = useRef(0);
  return useCallback(
    (...args: T) => {
      const now = Date.now();
      if (now - lastCall.current < delay) {
        return;
      }
      lastCall.current = now;
      callback(...args);
    },
    [callback, delay]
  );
}
export interface ThrottledButtonProps {
  btnTitle?: string;
  className?: string;
  onClick?: () => void;
  delay?: number;
  disabled?: boolean;
}
export const ThrottledBtn: React.FC<ThrottledButtonProps> = ({
  btnTitle = "",
  className = "",
  onClick = () => {},
  delay = 1000,
  disabled = false,
}) => {
  const throttledClick = useThrottle(onClick, delay);
  return (
    <button className={className} onClick={throttledClick} disabled={disabled}>
      {btnTitle}
    </button>
  );
};
