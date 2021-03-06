import { mergeClasses } from "@code4ro/reusable-components";
import React, { PropsWithChildren, ReactNode } from "react";
import { Link, Route } from "react-router-dom";

import classes from "./BallotTabs.module.scss";

const TabNavLink = ({ children, to }: PropsWithChildren<{ to: string }>) => (
  <Route path={to}>
    {({ match }) => (
      <Link
        to={(location) => ({ ...location, pathname: to })}
        className={mergeClasses(classes.navLink, match && classes.navLinkActive)}
      >
        {children}
      </Link>
    )}
  </Route>
);

type Props = {
  ballotId: number;
  children: ReactNode;
  indicators?: ReactNode;
};

export const BallotTabs: React.FC<Props> = ({ ballotId, children, indicators }) => {
  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <TabNavLink to={`/elections/${ballotId}/turnout`}>Prezența la vot</TabNavLink>
        <TabNavLink to={`/elections/${ballotId}/results`}>Rezultate vot</TabNavLink>
        <div className={classes.separator} />
        <div className={classes.indicators}>{indicators}</div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
