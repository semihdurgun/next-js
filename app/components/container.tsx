import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-4 px-8 flex-grow pb-4">{children}</div>
  );
}
