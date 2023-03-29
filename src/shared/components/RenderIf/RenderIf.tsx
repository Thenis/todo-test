import { PropsWithChildren, ReactElement } from "react";

interface RenderIfProps {
  condition: boolean;
  alternative?: ReactElement;
}

const RenderIf = ({
  children,
  condition,
  alternative,
}: PropsWithChildren<RenderIfProps>) => {
  return condition ? <>{children}</> : alternative ? <>{alternative}</> : <></>;
};

export default RenderIf;
