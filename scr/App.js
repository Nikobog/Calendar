import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Calendar } from "./pages/Calendar";
import { NewMeeting } from "./pages/NewMeeting";
import "./styles.css";

const defaultMeetings = [
  {
    id: "m1",
    dayId: "d1",
    timeId: "t5",
    title: "Mit15",
    participants: ["u1", "u2"]
  },
  {
    id: "m2",
    dayId: "d2",
    timeId: "t7",
    title: "Mit27",
    participants: ["u1", "u3"]
  },
  {
    id: "m3",
    dayId: "d1",
    timeId: "t1",
    title: "Mit32",
    participants: ["u2", "u4", "u5"]
  }
];

export default function App() {
  const [meetings, setMeetings] = useState(defaultMeetings);

  console.log(meetings);

  function saveChanges(e) {
    let meetingFind = meetings.find((f) => f.id === e.id);
    let meetingPosition = meetings.indexOf(meetingFind);
    if (meetingPosition === 0) {
      setMeetings((state) =>
        meetings.slice(meetingPosition + 1, meetings.count)
      );
    } else if (meetingPosition > 0 && meetingPosition < meetings.length - 1) {
      let [beforeMeeting] = meetings.slice(0, meetingPosition);
      let [afterMeeting] = meetings.slice(meetingPosition + 1, meetings.count);
      let newMeetings = [beforeMeeting, afterMeeting];
      setMeetings((state) => newMeetings);
    } else if (meetingPosition === meetings.length - 1) {
      setMeetings((state) => meetings.slice(0, meetingPosition));
    }
    addMeeting(e);
  }

  function addMeeting(newMeeting) {
    if (
      newMeeting.dayId.length < 3 &&
      newMeeting.timeId.length < 3 &&
      newMeeting.participants.length > 0
    ) {
      setMeetings((state) =>
        state.concat({
          id: newMeeting.id,
          dayId: newMeeting.dayId,
          timeId: newMeeting.timeId,
          title: newMeeting.title,
          participants: newMeeting.participants
        })
      );
    }
  }

  function deleteMeeting(e) {
    let meetingFind = meetings.find((f) => f.id === e.target.id);
    let meetingPosition = meetings.indexOf(meetingFind);
    if (meetingPosition === 0) {
      setMeetings((state) =>
        meetings.slice(meetingPosition + 1, meetings.count)
      );
    } else if (meetingPosition > 0 && meetingPosition < meetings.length - 1) {
      let [beforeMeeting] = meetings.slice(0, meetingPosition);
      let [afterMeeting] = meetings.slice(meetingPosition + 1, meetings.count);
      let newMeetings = [beforeMeeting, afterMeeting];
      setMeetings((state) => newMeetings);
    } else if (meetingPosition === meetings.length - 1) {
      setMeetings((state) => meetings.slice(0, meetingPosition));
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/newmeeting" exact>
          <NewMeeting meetings={meetings} addMeeting={addMeeting} />
        </Route>
        <Route path="/" exact>
          <Calendar
            meetings={meetings}
            saveChanges={saveChanges}
            deleteMeeting={deleteMeeting}
          />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
