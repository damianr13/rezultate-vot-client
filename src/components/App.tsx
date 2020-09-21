import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { makeElectionApi, HereMapsAPIKeyProvider } from "@code4ro/reusable-components";
import { mockElectionAPI } from "@code4ro/reusable-components/dist/es/mocks";
import { ElectionAPIContext } from "./ElectionAPIContext";
import { BallotListProvider } from "./BallotListProvider";
import { AppLayout } from "./AppLayout";

const electionApi = process.env.REACT_APP_ELECTION_API_MOCKS
  ? mockElectionAPI
  : makeElectionApi({
      apiUrl:
        (process.env.NODE_ENV !== "production" && window.localStorage.getItem("code4roElectionApiUrl")) ||
        process.env.REACT_APP_ELECTION_API_URL ||
        "http://api.rezultatevot.ro/api", // TODO: Remove when we switch to HTTPs
    });

export const App: React.FC = () => {
  return (
    <Router>
      <HereMapsAPIKeyProvider value={process.env.REACT_APP_HEREMAPS_API_KEY || ""}>
        <ElectionAPIContext.Provider value={electionApi}>
          <BallotListProvider>
            <AppLayout />
          </BallotListProvider>
        </ElectionAPIContext.Provider>
      </HereMapsAPIKeyProvider>
    </Router>
  );
};