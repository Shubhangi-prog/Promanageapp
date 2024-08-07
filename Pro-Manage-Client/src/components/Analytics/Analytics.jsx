import React, { useEffect, useMemo, useState } from "react";
import style from "./Analytics.module.css";
import { GoDotFill } from "react-icons/go";
import { AllAnalytics } from "../../apis/TaskApi";

const Analytics = () => {
  const [allAnalyticsData, setallAnalyticsData] = useState();

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const fetchData = async () => {
      try {
        const response = await AllAnalytics();
        if (isMounted) {
          setallAnalyticsData(response);
          const res = JSON.stringify(response);
          localStorage.setItem("analytics", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only if it hasn't been fetched before
    if (!allAnalyticsData) {
      fetchData();
    }

    // Cleanup function
    return () => {
      isMounted = false; // Update mounted status when component unmounts
    };
  }, [allAnalyticsData]);

  //   const GetAnalyticsData = async () => {
  //     const response = await AllAnalytics();
  //     console.log(response);
  //     setallAnalyticsData(response);

  //   };

  //  useEffect(() => {
  //     GetAnalyticsData();
  //     console.log("anliticts visited");
  //   }, [count]);
  


//  If there response present in localStorage it will return data from local storage



  if(localStorage.getItem("analytics")){
    return(
   <div className={style.AnalyticsBody}>
      <div className={style.AnalyticsHeader}>Analytics</div>
      <div className={style.AnalyticsContainer}>
        <div className={style.ContainerContent}>
          <ul>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                Backlog Tasks
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allBacklogTask < 10
                    ? `0${allAnalyticsData.allBacklogTask}`
                    : allAnalyticsData.allBacklogTask
                  : localStorage.getItem("analytics")?
                  JSON.parse(localStorage.getItem("analytics"))
                      .allBacklogTask < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allBacklogTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allBacklogTask
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                To-do Task
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allTodoTask < 10
                    ? `0${allAnalyticsData.allTodoTask}`
                    : allAnalyticsData.allTodoTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics")).allTodoTask <
                    10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allTodoTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics")).allTodoTask
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                In-Progress Tasks
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allInProgress < 10
                    ? `0${allAnalyticsData.allInProgress}`
                    : allAnalyticsData.allInProgress
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics"))
                      .allInProgress < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allInProgress
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allInProgress
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                Completed Tasks
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allDoneTask < 10
                    ? `0${allAnalyticsData.allDoneTask}`
                    : allAnalyticsData.allDoneTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics")).allDoneTask <
                    10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allDoneTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics")).allDoneTask
                  : "00"}
              </span>
            </li>
          </ul>
        </div>
        <div className={style.ContainerContent} style={{ marginLeft: "1rem" }}>
          <ul>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                Low Priority
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allLowPriorityTask < 10
                    ? `0${allAnalyticsData.allLowPriorityTask}`
                    : allAnalyticsData.allLowPriorityTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics"))
                      .allLowPriorityTask < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allLowPriorityTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allLowPriorityTask
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                Moderate Priority
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allModeratePriorityTask < 10
                    ? `0${allAnalyticsData.allModeratePriorityTask}`
                    : allAnalyticsData.allModeratePriorityTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics"))
                      .allModeratePriorityTask < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allModeratePriorityTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allModeratePriorityTask
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                High Priority
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allHighPriorityTask < 10
                    ? `0${allAnalyticsData.allHighPriorityTask}`
                    : allAnalyticsData.allHighPriorityTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics"))
                      .allHighPriorityTask < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allHighPriorityTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allHighPriorityTask
                  : "00"}
              </span>
            </li>
            <li>
              <span>
                <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
                Due Date Tasks
              </span>{" "}
              <span style={{ fontWeight: "600" }}>
                {allAnalyticsData
                  ? allAnalyticsData.allDuedateTask < 10
                    ? `0${allAnalyticsData.allDuedateTask}`
                    : allAnalyticsData.allDuedateTask
                  : localStorage.getItem("analytics")
                  ? JSON.parse(localStorage.getItem("analytics"))
                      .allDuedateTask < 10
                    ? `0${
                        JSON.parse(localStorage.getItem("analytics"))
                          .allDuedateTask
                      }`
                    : JSON.parse(localStorage.getItem("analytics"))
                        .allDuedateTask
                  : "00"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    )
  }else{

  return (
    <div className={style.AnalyticsBody}>
    <div className={style.AnalyticsHeader}>Analytics</div>
    <div className={style.AnalyticsContainer}>
      <div className={style.ContainerContent}>
        <ul>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              Backlog Tasks
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allBacklogTask < 10
                  ? `0${allAnalyticsData.allBacklogTask}`
                  : allAnalyticsData.allBacklogTask
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              To-do Task
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allTodoTask < 10
                  ? `0${allAnalyticsData.allTodoTask}`
                  : allAnalyticsData.allTodoTask
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              In-Progress Tasks
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allInProgress < 10
                  ? `0${allAnalyticsData.allInProgress}`
                  : allAnalyticsData.allInProgress
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              Completed Tasks
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allDoneTask < 10
                  ? `0${allAnalyticsData.allDoneTask}`
                  : allAnalyticsData.allDoneTask
                : "00"}
            </span>
          </li>
        </ul>
      </div>
      <div className={style.ContainerContent} style={{ marginLeft: "1rem" }}>
        <ul>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              Low Priority
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allLowPriorityTask < 10
                  ? `0${allAnalyticsData.allLowPriorityTask}`
                  : allAnalyticsData.allLowPriorityTask
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              Moderate Priority
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allModeratePriorityTask < 10
                  ? `0${allAnalyticsData.allModeratePriorityTask}`
                  : allAnalyticsData.allModeratePriorityTask
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              High Priority
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allHighPriorityTask < 10
                  ? `0${allAnalyticsData.allHighPriorityTask}`
                  : allAnalyticsData.allHighPriorityTask
                : "00"}
            </span>
          </li>
          <li>
            <span>
              <GoDotFill style={{ color: "#90C4CC", marginRight: "1rem" }} />{" "}
              Due Date Tasks
            </span>{" "}
            <span style={{ fontWeight: "600" }}>
              {allAnalyticsData
                ? allAnalyticsData.allDuedateTask < 10
                  ? `0${allAnalyticsData.allDuedateTask}`
                  : allAnalyticsData.allDuedateTask
                : "00"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
 
  );
                    }
};

export default Analytics;
