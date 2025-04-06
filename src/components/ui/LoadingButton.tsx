import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <Button type={type} disabled={isLoading || disabled} onClick={onClick}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
