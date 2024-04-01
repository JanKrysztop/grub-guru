import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectComponentBackground } from "@/redux/themeSlice";
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  isWithinInterval,
  isSameDay,
  parseISO,
  addWeeks,
  subWeeks,
} from "date-fns";
import CalendarMonth from "./CalendarMonth";
import { useColorScheme } from "@mui/joy/styles";
import { Box, Button, Typography, Sheet, Divider } from "@mui/joy";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  TodayRounded,
} from "@mui/icons-material";

const Calendar = ({ date, handleDateChange, entries }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(date || new Date());
  const refPicker = useRef();
  const backgroundColor = useSelector(selectComponentBackground);
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    const startWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    // Check if the selected date is within the currently displayed week
    if (!isWithinInterval(date, { start: startWeek, end: endWeek })) {
      // If not, update currentDate to the selected date to change the week view
      setCurrentDate(date);
    }
  }, [date]);
  const startWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  // const handleDateClick = (newDate) => {
  //   setDate(newDate);
  //    // Close the DatePicker after selecting a date
  // };

  const handleCalendar = (e) => {
    e.preventDefault();
    setOpenCalendar(!openCalendar);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refPicker.current && !refPicker.current.contains(event.target)) {
        setOpenCalendar(false);
      }
    };

    // Add event listeners when mounted
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Handle touch screens

    // Cleanup event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  const previousWeek = () => {
    const newCurrentDate = subWeeks(currentDate, 1);
    setCurrentDate(newCurrentDate);

    // Set 'date' to the first day of the new week
    const startOfNewWeek = startOfWeek(newCurrentDate, { weekStartsOn: 1 });
    handleDateChange(startOfNewWeek);
  };

  const nextWeek = () => {
    const newCurrentDate = addWeeks(currentDate, 1);
    setCurrentDate(newCurrentDate);

    // Set 'date' to the first day of the new week
    const startOfNewWeek = startOfWeek(newCurrentDate, { weekStartsOn: 1 });
    handleDateChange(startOfNewWeek);
  };
  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      let day = addDays(startWeek, i);
      const isSelected = isSameDay(day, date);
      const hasEntry = entries.some((entry) => {
        if (typeof entry.date === "undefined") {
          console.warn("Entry date is undefined, skipping:", entry);
          return false; // Skip this entry
        }
        // Assuming entry.date is a string in "YYYY-MM-DD" format
        const entryDate = parseISO(entry.date);
        return isSameDay(day, entryDate);
      });
      days.push(
        <Button
          key={i}
          onClick={() => handleDateChange(day)}
          variant="soft"
          color="neutral"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40px",
            height: "66px",
            p: 0,
            margin: 1,
            textAlign: "center",
            border: "1px solid #8E928C",
            borderRadius: "4px",
            backgroundColor: backgroundColor,
            // "&:hover": {
            //   backgroundColor: "#E1FEEA",
            // },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "10px" }}>
              {format(day, "EEE")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "25px",
                  height: "25px",
                  backgroundColor: isSelected ? "#0B93E0" : "",
                  borderRadius: "12px",
                  mb: 1,
                }}
              >
                <Typography level="body2">{format(day, "d")}</Typography>
              </Box>
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#6DC201",
                  borderRadius: "12px",
                  visibility: hasEntry ? "visible" : "hidden",
                }}
              ></Box>
            </Box>
          </Box>
        </Button>
      );
    }
    return days;
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "sm",
      }}
    >
      <Sheet
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          borderRadius: "4px",
          padding: 1,
          backgroundColor: backgroundColor,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="plain"
              size="lg"
              color="neutral"
              onClick={previousWeek}
              sx={{
                "&:hover": {
                  backgroundColor: mode === "dark" && "#6A6D69",
                },
              }}
            >
              <ChevronLeftRounded />
            </Button>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                width: "160px",
                textAlign: "center",
                marginX: 2,
              }}
            >
              {`${format(startWeek, "d MMM")} - ${format(endWeek, "d MMM")}`}
            </Typography>
            <Button
              variant="plain"
              size="lg"
              color="neutral"
              onClick={nextWeek}
              sx={{
                "&:hover": {
                  backgroundColor: mode === "dark" && "#6A6D69",
                },
              }}
            >
              <ChevronRightRounded />
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button
                variant="plain"
                size="lg"
                color="neutral"
                sx={{
                  marginLeft: "auto",
                  "&:hover": {
                    backgroundColor: mode === "dark" && "#6A6D69",
                  },
                }}
                onClick={handleCalendar}
              >
                <TodayRounded />
              </Button>
              <CalendarMonth
                ref={refPicker}
                openCalendar={openCalendar}
                setOpenCalendar={setOpenCalendar}
                date={date}
                handleDateChange={handleDateChange}
                setCurrentDate={setCurrentDate}
                currentDate={currentDate}
                entries={entries}
                backgroundColor={backgroundColor}
                mode={mode}
              />
            </Box>
          </Box>
          <Divider />
          <Box display="flex">{renderDays()}</Box>
        </Box>
      </Sheet>
    </Box>
  );
};

export default Calendar;
