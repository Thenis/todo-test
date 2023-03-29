import { Paper, styled } from "@mui/material";

export const AppPaper = styled(Paper)(() => {
  return `
    width: 100%;
    padding: 28px;
    border-radius: 16px;
  `;
});

export const AppPaperTop = styled(Paper)(() => {
  return `
    width: 100%;
    padding: 28px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  `;
});

export const AppPaperContent = styled(Paper)(() => {
  return `
    width: 100%;
    padding: 28px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: 0px 5px 5px -3px rgba(145, 158, 171, 0.2),0px 8px 10px 1px rgba(145, 158, 171, 0.14),0px 3px 14px 2px rgba(255, 255, 255, 0.12);
  `;
});
