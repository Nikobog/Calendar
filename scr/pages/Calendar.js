import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Meeting } from "../Meeting";
import { days, times, users } from "./constants";
import "../styles.css";

const EMPTY_OPTION = {
  label: "All users",
  id: "ALL_USERS"
};

export function Calendar(props) {
  const { meetings, saveChanges, deleteMeeting } = props;
  const [filterUser, setFilterUser] = useState(EMPTY_OPTION.id);

  const filteredMeetings = meetings.filter(
    (m) => filterUser === EMPTY_OPTION.id || m.participants.includes(filterUser)
  );

  const onFilterUser = (e) => {
    const selectedUserId = e.target.value;
    setFilterUser(selectedUserId);
  };
  return (
    <div className="App container">
      <div className="panel row">
        <h3 className="col-sm-4">Calendar</h3>
        <Link className="buttonLink col-md-3 offset-md-1" to="/newmeeting">
          Add meeting
        </Link>
        <select
          className="buttonLink col-md-3 offset-md-1"
          value={filterUser}
          onChange={onFilterUser}
        >
          <option value={EMPTY_OPTION.id}>{EMPTY_OPTION.label}</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.title}
            </option>
          ))}
        </select>
      </div>
      <div className="container calendar-area">
        <div className="row">
          <div className="col-2 calendar-cell">Name</div>
          {days.map((day) => {
            return (
              <div key={day.id} className="col-2 calendar-cell">
                {day.title}
              </div>
            );
          })}
        </div>
        {times.map((time) => {
          return (
            <div key={time.id} className="row">
              <div className="col-2 calendar-cell">{time.title}</div>
              {days.map((day) => {
                const meeting = filteredMeetings.find(
                  (d) => d.dayId === day.id && d.timeId === time.id
                );
                return (
                  <div key={day.id} className="col-2 calendar-cell">
                    {meeting && (
                      <Meeting
                        data={meeting}
                        meetings={meetings}
                        saveChanges={saveChanges}
                        deleteMeeting={deleteMeeting}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
