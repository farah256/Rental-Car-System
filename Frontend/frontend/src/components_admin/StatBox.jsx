import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, progress, increase, backgroundColor, iconColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      m="0 30px"
      sx={{
        padding: "20px",  // Add some padding to the box
      }}

    >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Box >
          <Box sx={{ marginLeft: "250px" }}>
            {/* Adjusting the size and custom color of the icon */}
            <Box sx={{ fontSize: "40px", color: iconColor || colors.greenAccent[500] }}>
              {icon}
            </Box>
          </Box>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
