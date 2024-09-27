import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";

interface HtmlTooltipProps {
  className?: string;
  title?: string|React.ReactNode;
  children?: React.ReactNode;
}

const HtmlTooltip = styled(({ className, children, title,...props }: HtmlTooltipProps) => (
  <Tooltip
    {...props}
    placement="bottom"
    enterDelay={500}
    classes={{ popper: className }}
    title={title || ""}
    slotProps={{
      popper: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -90],
            },
          },
        ],
      },
    }}
  >
    {children as React.ReactElement}
  </Tooltip>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.87)',
    border: 'solid 1px #e0e0e0',
  },
}));

export default HtmlTooltip;
