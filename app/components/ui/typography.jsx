import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typeVariants = cva("font-semibold", {
  variants: {
    variant: {
      heading1:
        "text-[72px] leading-[76px] md:text-[80px] md:leading-[84px] tracking-[-1.5px]",
      heading2:
        "text-[48px] leading-[52px] md:text-[60px] md:leading-[60px] tracking-[-0.5px]",
      heading3: "text-[40] leading-[44px] md:text-[48px] md:leading-[52px]",
      heading4:
        "text-[28px] leading-[32px] md:text-[34px] md:leading-[40px] tracking-[0.25px]",
      heading5: "text-[24px] leading-[28px] md:text-[24px] md:leading-[32px]",
      heading6: "text-[20px] leading-[24px] tracking-[0.15px]",
      subtitle1: "text-[16px] leading-[24px] tracking-[0.15px]",
      subtitle2: "text-[14px] leading-[20px] tracking-[0.1px]",
      button: "text-[16px] leading-[24px] tracking-[0.5px]",
      body1: "font-normal text-[16px] leading-[24px] tracking-[0.15px]",
      body2: "font-normal text-[14px] leading-[20px] tracking-[0.25x]",
    },
  },
});

const variantToHeadingMap = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
  button: "span",
};

function Typography({ children, className, variant, ...props }) {
  const Header = variantToHeadingMap[variant] || "p";
  return (
    <Header className={cn(typeVariants({ variant }), className)} {...props}>
      {children}
    </Header>
  );
}

export { Typography, typeVariants };
