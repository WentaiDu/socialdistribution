import React, { Fragment, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Question from "./Questions/QuestionHandler";
import { UserContext } from "./UserContext";
import { cloneDeep } from "lodash";
import Card from "@mui/material/Card";
import loadingImage from "../images/loading_orange.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const base_url = process.env.REACT_APP_API_URL || "http://localhost:8000";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00428b",
    },
    secondary: {
      main: "#ffa800",
    },
  },
});

export default function Test() {
  const userCtx = useContext(UserContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);
  const [data, setData] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function getAssessment() {
    let res;
    if (!userCtx?.orgAssessmentDetails?.slug) {
      userCtx.setOrgAssessmentDetailsHandler();
      return;
    }
    try {
      res = await axios.get(
        `${base_url}/api/assessment/${userCtx?.orgAssessmentDetails?.slug}`,
        {
          headers: {
            Authorization: "token " + userCtx.token,
          },
        }
      );
    } catch (e) {
      console.log("error", e);
    }
    res.data.assessment.activity_set.responses.sort(
      (x, y) => x.question - y.question
    );
    setData(res.data);
    setSteps(res.data.assessment.questions.map((_, index) => index + 1));
    setCompleted(
      res.data.assessment.activity_set.responses.map(
        (response) => !!response.choices.length
      )
    );
    setIsLoading(false);
  }

  useEffect(() => {
    getAssessment();
  }, [userCtx]);

  useEffect(() => {
    if (checkCompletedStepsAllTrue()) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [activeStep, completed]);

  useEffect(() => {
    setIsReadyToSubmit(false);
  }, [data]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const checkCompletedStepsAllTrue = () => {
    return !completed.some((done) => !done);
  };

  const setActiveStepDefaults = (newActiveStep) => {
    setActiveStep(newActiveStep);
    const questionType = data.assessment.questions[newActiveStep].question_type;
    const isFresh =
      !data.assessment.activity_set.responses[newActiveStep].choices.length;
    if (isFresh && (questionType === 5 || questionType === 4)) {
      const newTempData = cloneDeep(data);
      newTempData.assessment.activity_set.responses[newActiveStep].choices =
        newTempData.assessment.questions[newActiveStep].choices.map(
          (choice) => ({
            answer_choice: 0,
            choice: choice.id,
          })
        );
      setData(newTempData);
    }
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : isLastStep()
        ? 0
        : activeStep + 1;
    setActiveStepDefaults(newActiveStep);
  };

  const handleBack = () => {
    setActiveStepDefaults(activeStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStepDefaults(step);
  };

  const handleSubmit = async () => {
    //api request
    let res;
    try {
      res = await axios.patch(
        `${base_url}/api/save-response`,
        data.assessment.activity_set.responses[activeStep],
        {
          headers: {
            Authorization: "token " + userCtx.token,
          },
        }
      );
    } catch (e) {
      console.log("error", e);
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted([...newCompleted]);
    handleNext();
  };

  const handleFinish = async () => {
    //api request
    let res;
    try {
      res = await axios.post(
        `${base_url}/api/assessment/${userCtx?.orgAssessmentDetails?.slug}/submit`,
        data.assessment.activity_set.responses[activeStep],
        {
          headers: {
            Authorization: "token " + userCtx.token,
          },
        }
      );
      history.push("/boardmembers");
    } catch (e) {
      console.log("error", e);
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div className="Blue-background">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              justifyContent: "center",
            }}
          >
            <img src={loadingImage} height="180px" />
            <CircularProgress style={{ color: "#ffa800", margin: "20px" }} />
          </Box>
        </div>
        <Button
          variant="text"
          size="small"
          style={{
            position: "absolute",
            bottom: 9,
            right: 16,
            margin: 5,
            color: "white",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            sessionStorage.removeItem("UserProfile");
            history.push("/");
            history.go(0);
          }}
        >
          Seeing this for too long? Click here to reset
        </Button>
      </ThemeProvider>
    );
  } else
    return (
      <div>
        <div className="App-header" style={{ color: "white" }}>
          You are taking the assessment for your organization
          <br />
          <br />
          <Card
            sx={{
              minWidth: "80vw",
              align: "center",
              padding: "30px",
              borderRadius: 7,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {/* {label} */}
                      {""}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <Fragment>
                <Question
                  assessment={data.assessment.questions[activeStep].assessment}
                  choices={data.assessment.questions[activeStep].choices}
                  questionType={
                    data.assessment.questions[activeStep].question_type
                  }
                  text={data.assessment.questions[activeStep].text}
                  data={data}
                  activeStep={activeStep}
                  setData={setData}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Previous Question
                  </Button>
                  <Button onClick={() => history.push("/boardmembers")}>
                    Return to Dashboard
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {!isReadyToSubmit ? (
                    <>
                      {" "}
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                      {activeStep !== steps.length && (
                        <Button onClick={handleSubmit}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : `${
                                completed[activeStep] ? "ReS" : "S"
                              }ubmit Answer`}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button onClick={() => setOpenModal(true)}>
                      Submit Assessment
                    </Button>
                  )}
                </Box>
              </Fragment>
            </Box>
          </Card>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400",
                backgroundColor: "white",
                boxShadow: 24,
                padding: 24,
              }}
            >
              <Typography variant="h6" component="h2">
                ATTENTION
              </Typography>
              <Typography sx={{ mt: 2 }}>
                After submitting you can no longer edit your answers!
              </Typography>
              <br />

              <Button
                style={{ borderColor: "red", color: "red" }}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Go back and review
              </Button>
              <Button
                onClick={() => {
                  handleFinish();
                  setOpenModal(false);
                }}
              >
                Submit Assessment
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    );
}
