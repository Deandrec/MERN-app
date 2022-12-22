import { Box } from "@mui/material";
import { styled } from "@mui/system";
// can use css stling on multiple componets
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween