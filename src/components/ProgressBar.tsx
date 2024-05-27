"use client";

import { Progress } from "./ui/progress";

const ProgressBar = ({ value }: { value: number }) => {
  return <Progress value={value * 100} />;
};
export default ProgressBar;
