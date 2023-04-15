import { render, screen } from "@testing-library/react";
import RenderIf from "./RenderIf";

describe("RenderIf", () => {
  it("should render children when condition is true", () => {
    render(<RenderIf condition={true}>Hello World</RenderIf>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render alternative when condition is false and alternative is provided", () => {
    render(
      <RenderIf condition={false} alternative={<div>No alternative</div>} />
    );
    expect(screen.getByText("No alternative")).toBeInTheDocument();
  });

  it("should not render anything when condition is false and alternative is not provided", () => {
    render(<RenderIf condition={false}>Hello World</RenderIf>);
    expect(screen.queryByText("Hello World")).toBeNull();
  });
});
