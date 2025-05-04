import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-7xl", className)}
      {...props}
    />
  );
});
Container.displayName = "Container";

export { Container };
