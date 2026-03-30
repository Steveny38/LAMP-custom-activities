import "react-circular-progressbar/dist/styles.css";
import i18n from "../i18n";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Typography,
  makeStyles,
  Box,
  Slide,
  useMediaQuery,
  useTheme,
  Container,
  LinearProgress,
  createStyles,
  withStyles,
  Theme,
  AppBar,
  Icon,
  IconButton,
  Toolbar,
  Grid,
  Fab,
  CircularProgress,
  Link,
  TextField,
} from "@material-ui/core";
import Lotus from "./Lotus";
import { useTranslation } from "react-i18next";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#FFAC98",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#E56F61",
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  likebtn: {
    fontStyle: "italic",
    width: 36,
    height: 36,
    padding: 9,
    margin: "0 5px",
    "&:hover": { background: "#FE8470" },
    "& label": {
      position: "absolute",
      bottom: -18,
      fontSize: 12,
    },
  },
  "@keyframes InhaleText": {
    "0%": { opacity: 0 },
    "15%": { opacity: 1 },
    "40%": { opacity: 1 },
    "50%": { opacity: 0, display: "inline" },
    "75%": { opacity: 0 },
    "100%": { opacity: 0, display: "none" },
  },
  "@keyframes ExhaleText": {
    "0%": { opacity: 0 },
    "25%": { opacity: 0, display: "none" },
    "50%": { opacity: 0 },
    "65%": { opacity: 1, display: "inline" },
    "80%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  inhale_exhale: { position: "relative", height: 50 },
  InhaleContainer: {
    display: "block",
    animation: "$InhaleText ease infinite",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: 30,
    textTransform: "capitalize",
  },
  ExhaleContainer: {
    display: "block",
    marginTop: "-2rem",
    animation: "$ExhaleText ease infinite",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: 30,
    textTransform: "capitalize",
  },
  active: { background: "#FE8470" },
  toolbardashboard: {
    minHeight: 65,
    padding: "0 10px",
    "& h5": {
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      width: "calc(100% - 96px)",
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
    },
  },
  btnpeach: {
    background: "#FFAC98",
    padding: "15px 25px 15px 25px",
    borderRadius: "40px",
    minWidth: "200px",
    boxShadow: "0px 10px 15px rgba(255, 172, 152, 0.25)",
    lineHeight: "22px",
    display: "inline-block",
    textTransform: "capitalize",
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.75)",
    fontWeight: "bold",
    cursor: "pointer",
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#FFAC98",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      textDecoration: "none",
    },
  },
  breatheReview: {
    "& h4": { fontSize: 25, fontWeight: 600, marginBottom: 25, marginTop: -50 },
    "& p": { fontStyle: "italic", color: "rgba(0, 0, 0, 0.5)", margin: 15 },
  },
  progress: {
    color: "#E46759",
  },
  videoNav: {
    marginBottom: 30,
    "& video": {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: 400,
      },
    },
  },
  lineyellow: {
    background: "#FFD645",
    height: "3px",
  },
  linegreen: {
    background: "#65CEBF",
    height: "3px",
  },
  linered: {
    background: "#FF775B",
    height: "3px",
  },
  lineblue: {
    background: "#86B6FF",
    height: "3px",
  },
  colorLine: { maxWidth: 115 },
  headerTitleIcon: {
    background: "none",
    boxShadow: "none",
    width: 36,
    height: 36,
    color: "#666",
    marginLeft: 8,
    "& .material-icons": {
      fontSize: "2rem",
    },
    "&:hover": {
      background: "#fff",
    },
    "&.active": {
      color: "#e3b303",
    },
  },
}));

export default function Breathe({ ...props }) {
  const classes = useStyles();
  const [started, setStarted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState("Yes");
  const [progress, setProgress] = React.useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [inhale, setInhale] = useState(true);
  const [playMusic, setPlayMusic] = useState(true);
  const [audio, setAudio] = useState(null);
  const [time, setTime] = useState(new Date().getTime());
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [forward, setForward] = useState(props?.data?.forward);
  const [isForwardButton, setIsForwardButton] = useState(false);
  const [breathDuration, setBreathDuration] = useState(null);
  const [customDuration, setCustomDuration] = useState("");
  const [progressLabel, setProgressLabel] = useState(0);

  const resolvedDuration =
    breathDuration === "custom" ? Number(customDuration) : Number(breathDuration);

  const resolvedDurationRef = React.useRef(resolvedDuration);
  useEffect(() => {
    resolvedDurationRef.current = resolvedDuration;
  }, [resolvedDuration]);

  const timerRef = React.useRef(null);
const cycleRef = React.useRef({ label: 0, isInhale: true, duration: 0 });

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

const startTimer = () => {
  if (timerRef.current) clearInterval(timerRef.current);

  const duration = resolvedDurationRef.current;

  cycleRef.current = { label: duration, isInhale: true, duration };

  setProgressLabel(duration);
  setProgress(100);
  setInhale(true);

  timerRef.current = setInterval(() => {
    const c = cycleRef.current;
    const nextLabel = c.label - 1;

    if (nextLabel < 1) {
      cycleRef.current = { label: c.duration, isInhale: !c.isInhale, duration: c.duration };
      setProgressLabel(c.duration);
      setProgress(100);
      setInhale(!c.isInhale);
    } else {
      cycleRef.current = { ...c, label: nextLabel };
      setProgressLabel(nextLabel);
      setProgress(Math.round((nextLabel / c.duration) * 100));
      setInhale(c.isInhale);
    }
  }, 1000);
};
  const tabDirection = (currentTab: number) => {
    return supportsSidebar ? "up" : "left";
  };

  const handleNext = () => {
    setTab(tab + 1);
    setIsLoading(true);
    if (!!audio) {
      (audio || new Audio()).loop = true;
      playMusic && tab < 1
        ? (audio || new Audio()).play()
        : (audio || new Audio()).pause();
    }
  };

  const videoLoaded = () => {
    setIsLoading(false);
    setStarted(true);
    setTime(new Date().getTime());
    startTimer();
  };

  useEffect(() => {
    const settingsData =
      props.data.activity?.settings ?? props.data.settings ?? {};
    const configuration = props.data.configuration;
    const language = configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US";
    i18n.changeLanguage(language);
    setSettings(settingsData);
    if (
      (!!settingsData &&
        !!settingsData?.audio_url &&
        (settingsData?.audio_url || "").trim() !== "") ||
      !!settingsData?.audio
    ) {
      setAudio(
        new Audio(settingsData?.audio_url ?? settingsData?.audio ?? "")
      );
    }
  }, []);

  // overall progress bar driven by audio duration or fallback
  useEffect(() => {
    if (started) {
      if (progressValue < 100) {
        const val =
          progressValue +
          (!!audio && !isNaN(audio.duration)
            ? Math.round((100 / audio.duration) * 10) / 10
            : 0.8);
        setProgressValue(val > 100 ? 100 : val);
      } else {
        stopTimer();
        setStarted(false);
        setPlayMusic(false);
        handleNext();
      }
    }
  }, [progress]);

  // cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, []);

  const handleClickStatus = (statusVal: string) => {
    setStatus(statusVal);
  };

  const onBreatheComplete = (statusVal?: boolean) => {
    parent.postMessage(
      !!statusVal
        ? JSON.stringify({
            timestamp: time,
            duration: new Date().getTime() - time,
            static_data: { sentiment: status },
            temporal_slices: [],
            ...(forward && { forward: isForwardButton }),
            done: true,
          })
        : JSON.stringify({
            timestamp: time,
            duration: new Date().getTime() - time,
            temporal_slices: [],
            ...(forward && { forward: isForwardButton }),
          }),
      "*"
    );
  };

  const handleForwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        duration: new Date().getTime() - time,
        temporal_slices: [],
        forward: true,
      }),
      "*"
    );
  };

  const handleBackClick = () => {
    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        duration: new Date().getTime() - time,
        temporal_slices: [],
        forward: false,
        clickBack: true,
      }),
      "*"
    );
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#FBF1EF", boxShadow: "none" }}
      >
        <Toolbar className={classes.toolbardashboard}>
          <IconButton
            onClick={() => {
              setPlayMusic(false);
              if (!!audio) audio.pause();
              setAudio(null);
              setIsForwardButton(false);
              handleBackClick();
            }}
            color="default"
            aria-label="Menu"
          >
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h5">{t("Breathe")}</Typography>
          {forward && (
            <IconButton onClick={handleForwardClick}>
              <Icon>arrow_forward</Icon>
            </IconButton>
          )}
        </Toolbar>
        <BorderLinearProgress variant="determinate" value={progressValue} />
      </AppBar>
      <Container>
        {/* TAB 0 - Duration selection + Start */}
        <Slide
          in={tab === 0}
          direction={tabDirection(0)}
          mountOnEnter
          unmountOnExit
        >
          <Box textAlign="center" mt={4}>
            <Lotus />
            <Typography variant="h6">{t("Get ready")}</Typography>
            <Box textAlign="center" px={4} pt={2} pb={3}>
              <Typography variant="body2" component="p">
                {t(
                  "Get yourself comfortable and when you're ready tap the start button."
                )}
              </Typography>
            </Box>

            {/* Duration selector */}
            <Typography variant="body2" style={{ marginBottom: 8 }}>
              {t("Select breath duration")}
            </Typography>
            <Box mt={1} mb={2}>
              {[3, 4, 5, "custom"].map((val) => (
                <Fab
                  key={val}
                  size="small"
                  onClick={() => {
                    setBreathDuration(val);
                    setCustomDuration("");
                  }}
                  style={{
                    margin: "0 4px",
                    background: breathDuration === val ? "#FFAC98" : undefined,
                    flexShrink: 0,
                    minWidth: val === "custom" ? 80 : undefined,
                  }}
                >
                  {val === "custom" ? t("Custom") : `${val}s`}
                </Fab>
              ))}
            </Box>

            {/* Custom duration input */}
            {breathDuration === "custom" && (
              <Box mb={2}>
                <TextField
                  type="number"
                  label={t("Seconds")}
                  inputProps={{ min: 1, max: 60 }}
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Box>
            )}

            {/* Start button */}
            <Box mt={2}>
              <Fab
                className={classes.btnpeach}
                onClick={handleNext}
                disabled={
                  !breathDuration ||
                  (breathDuration === "custom" && !customDuration)
                }
              >
                {t("Start")}
              </Fab>
            </Box>
          </Box>
        </Slide>

        {/* TAB 1 - Breathing exercise */}
        <Slide
          in={tab === 1}
          direction={tabDirection(1)}
          mountOnEnter
          unmountOnExit
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            {isLoading && (
              <Box alignItems="center">
                <Box width={1}>
                  <CircularProgress />
                </Box>
              </Box>
            )}
            <Grid item className={classes.videoNav}>
              <video
                src="https://github.com/BIDMCDigitalPsychiatry/LAMP-activities/raw/refs/heads/dist/misc/Lotus.mp4"
                autoPlay={true}
                onLoadedData={videoLoaded}
                loop
                preload="metadata"
              />
              {started && (
                <Box className={classes.inhale_exhale}>
                  <Typography
                    variant="overline"
                    className={classes.ExhaleContainer}
                    style={{ animationDuration: `${resolvedDuration * 2}s` }}
                  >
                    {t("Exhale")}
                  </Typography>
                  <Typography
                    variant="overline"
                    className={classes.InhaleContainer}
                    style={{ animationDuration: `${resolvedDuration * 2}s` }}
                  >
                    {t("Inhale")}
                  </Typography>
                </Box>
              )}
            </Grid>
            {started && (
              <Box style={{ width: "100px", height: "100px" }}>
                <CircularProgressbar
                  value={progress}
                  text={`${progressLabel}`}
                  strokeWidth={8}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#E46759",
                    textColor: "#BC453D",
                    trailColor: "#FFAC98",
                    textSize: "45px",
                    pathTransitionDuration: 1,
                  })}
                />
              </Box>
            )}
          </Grid>
        </Slide>

        {/* TAB 2 - Completion screen */}
        <Slide
          in={tab === 2}
          direction={tabDirection(2)}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Box textAlign="center" className={classes.breatheReview}>
              <Lotus />
              <Typography variant="h4">{t("Nicely done!")}</Typography>
              <Box mt={4} mb={2}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    container
                    className={classes.colorLine}
                    spacing={0}
                    xs={4}
                    md={4}
                    lg={2}
                  >
                    <Grid item xs={3} className={classes.lineyellow} />
                    <Grid item xs={3} className={classes.linegreen} />
                    <Grid item xs={3} className={classes.linered} />
                    <Grid item xs={3} className={classes.lineblue} />
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="body2">
                {t("Was this helpful today?")}
              </Typography>
              <Box textAlign="center" mb={5}>
                <IconButton
                  onClick={() => handleClickStatus("Yes")}
                  className={
                    status === "Yes"
                      ? classes.likebtn + " " + classes.active
                      : classes.likebtn
                  }
                >
                  <ThumbUpAltOutlinedIcon />
                  <label>{t("Yes")}</label>
                </IconButton>
                <IconButton
                  onClick={() => handleClickStatus("No")}
                  className={
                    status === "No"
                      ? classes.likebtn + " " + classes.active
                      : classes.likebtn
                  }
                >
                  <ThumbDownAltOutlinedIcon />
                  <label>{t("No")}</label>
                </IconButton>
              </Box>
              <Box textAlign="center" pt={4}>
                <Link
                  className={classes.btnpeach}
                  onClick={() => onBreatheComplete(true)}
                >
                  {t("Done")}
                </Link>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Container>
    </div>
  );
}