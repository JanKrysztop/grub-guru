import { useEffect, useState, forwardRef } from "react";
import { Box, Button, Typography, Sheet, Divider, Grid } from "@mui/joy";
import { ChevronLeft, ChevronRight, EventNote } from "@mui/icons-material";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameDay,
  parseISO,
} from "date-fns";

const CalendarMonth = forwardRef(
  (
    {
      date,
      handleDateChange,
      entries,
      setCurrentDate,
      currentDate,
      openCalendar,
      setOpenCalendar,
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {}, [date]);

    const handleMonthDayPick = (day) => {
      handleDateChange(day);
      setOpenCalendar(false);
    };
    useEffect(() => {
      const startDay = startOfWeek(currentMonth, { weekStartsOn: 1 });
      const endDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start: startDay, end: endDay });
      setCalendarDays(days);
    }, [currentMonth]);

    const previousMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
      const newCurrentDate = startOfMonth(subMonths(currentDate, 1));
      setCurrentDate(newCurrentDate);

      handleDateChange(newCurrentDate);
    };

    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
      const newCurrentDate = startOfMonth(addMonths(currentDate, 1));
      setCurrentDate(newCurrentDate);

      handleDateChange(newCurrentDate);
    };

    const renderCalendarDays = () => {
      return calendarDays.map((day, index) => {
        // const isSelected =
        //   format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
        const isCurrentMonth =
          day >= startOfMonth(currentMonth) && day <= endOfMonth(currentMonth);
        const isSelected = isSameDay(day, date);
        const hasEntry = entries.some((entry) => {
          // Assuming entry.date is a string in "YYYY-MM-DD" format
          const entryDate = parseISO(entry.date);
          return isSameDay(day, entryDate);
        });
        return (
          <Grid
            key={index}
            item
            sx={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 0,
              m: 0,
              margin: "4px",
            }}
          >
            <Button
              onClick={() => isCurrentMonth && handleMonthDayPick(day)}
              variant="plain"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                p: 0,
                m: 0,
                backgroundColor: isSelected ? "#0B93E0" : "",
                "&:hover": {
                  backgroundColor: isSelected ? "#0B93E0" : "#f0f0f0",
                },
                color: isCurrentMonth ? "inherit" : "#d0d0d0",
                borderRadius: "50%",
              }}
            >
              {format(day, "d")}
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#6DC201",
                  borderRadius: "12px",
                  visibility: hasEntry ? "visible" : "hidden",
                }}
              ></Box>
            </Button>
          </Grid>
        );
      });
    };

    return (
      <Box
        ref={ref}
        sx={{
          width: "360px",
          maxWidth: "sm",
          position: "absolute",
          zIndex: 1000, // Ensure it's above other content
          bottom: 0, // Adjust according to the exact positioning you need
          left: "auto",
          right: "80%", // Adjust based on your layout
          transform: "translateY(100%)", // Adjust or remove based on your needs
          display: openCalendar ? "block" : "none", // Control visibility
        }}
      >
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Button
              onClick={previousMonth}
              variant="plain"
              size="lg"
              color="neutral"
            >
              <ChevronLeft />
            </Button>
            <Typography
              sx={{ fontWeight: "bold", flexGrow: 1, textAlign: "center" }}
            >
              {format(currentMonth, "MMMM yyyy")}
            </Typography>
            <Button
              onClick={nextMonth}
              variant="plain"
              size="lg"
              color="neutral"
            >
              <ChevronRight />
            </Button>
          </Box>
          <Divider />
          <Grid
            container
            spacing={1}
            sx={{ padding: "16px", paddingBottom: 0 }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (dayName) => (
                <Grid
                  key={dayName}
                  item
                  xs={1}
                  sx={{
                    minWidth: "48px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    level="body2"
                    sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                  >
                    {dayName}
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
          <Grid container spacing={1} sx={{ padding: "16px" }}>
            {renderCalendarDays()}
          </Grid>
        </Sheet>
      </Box>
    );
  }
);
CalendarMonth.displayName = "CalendarMonth";
export default CalendarMonth;
