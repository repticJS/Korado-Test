'use client';

import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
type LocationType = 'Office' | 'Home';

const initialSelections: Record<(typeof days)[number], LocationType> = {
  Monday: 'Office',
  Tuesday: 'Home',
  Wednesday: 'Office',
  Thursday: 'Home',
  Friday: 'Office',
};

export default function Home() {
  const [weekPlan, setWeekPlan] = useState(initialSelections);

  const officeDays = useMemo(
    () => Object.values(weekPlan).filter((entry) => entry === 'Office').length,
    [weekPlan],
  );

  const isCompliant = officeDays >= 3;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Office Presence Tracker
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
            Set each day as Office or Home for a standard 5-day work week. Team members should attend
            the office at least 3 days per week.
          </Typography>
        </Box>

        <Card elevation={2}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Chip
                  icon={<HomeWorkOutlinedIcon />}
                  color="primary"
                  label={`Office Days: ${officeDays} / 5`}
                  sx={{ fontSize: '0.95rem', px: 1 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                {isCompliant ? (
                  <Alert icon={<CheckCircleRoundedIcon fontSize="inherit" />} severity="success">
                    Meets policy: at least 3 in-office days.
                  </Alert>
                ) : (
                  <Alert icon={<WarningAmberRoundedIcon fontSize="inherit" />} severity="warning">
                    Below minimum policy: schedule at least 3 days in-office.
                  </Alert>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {days.map((day) => {
            const value = weekPlan[day];
            const isHome = value === 'Home';

            return (
              <Grid key={day} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderColor: isHome ? 'rgba(34, 211, 238, 0.35)' : 'rgba(124, 77, 255, 0.45)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{day}</Typography>
                        {isHome && (
                          <Chip
                            size="small"
                            color="secondary"
                            icon={<HouseRoundedIcon />}
                            label="Home"
                          />
                        )}
                      </Stack>

                      <FormControl fullWidth>
                        <InputLabel id={`${day}-label`}>Location</InputLabel>
                        <Select
                          labelId={`${day}-label`}
                          id={`${day}-select`}
                          value={value}
                          label="Location"
                          onChange={(event) =>
                            setWeekPlan((prev) => ({
                              ...prev,
                              [day]: event.target.value as LocationType,
                            }))
                          }
                        >
                          <MenuItem value="Office">Office</MenuItem>
                          <MenuItem value="Home">Home</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
}
