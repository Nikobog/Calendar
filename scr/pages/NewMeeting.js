import React, { useState } from "react";
import { Link } from "react-router-dom";
import { days, times, users } from "../constants";

export function NewMeeting(props) {
  const { meetings, addMeeting } = props;
  let idNewMeeting = "m" + (meetings.length + 1);
  let i = 0;
  while (i < meetings.length + 1) {
    i++;
    let idExist = meetings.find((e) => e.id === "m" + i);
    if (!idExist) {
      idNewMeeting = "m" + i;
      break;
    }
  }

  /*  const [idNewMeeting, setIdNewMeeting] = useState("m" + 1);
  console.log("bbb" + idNewMeeting);
  for (let i = 1; i <= meetings.length + 1; i++) {
    let nik = meetings.find((e) => {
      if (e.id === "m" + i) {
        return true;
      }
      return false;
    });
    if (!nik) {
      console.log(nik);
      setIdNewMeeting("m" + i);
      break;
    }
    console.log(i);
  } */

  const EMPTY_OPTION_TIME = {
    label: "Choose time",
    id: "EMPTY_TIME"
  };

  const EMPTY_OPTION_DAY = {
    label: "Choose day",
    id: "EMPTY_DAY"
  };
  const [dataTitle, setDataTitle] = useState("New meeting");
  const [dataDay, setDataDay] = useState(EMPTY_OPTION_DAY.id);
  const [dataTime, setDataTime] = useState(EMPTY_OPTION_TIME.id);
  const [dataUser, setDataUser] = useState([]);

  const disabledButton = (dataTitle, dataDay, dataTime, dataUser) => {
    if (
      dataTitle !== "" &&
      dataDay !== EMPTY_OPTION_DAY.id &&
      dataTime !== EMPTY_OPTION_TIME.id &&
      dataUser.length > 0
    ) {
      return true;
    }
    return false;
  };

  const onChangeUser = (e) => {
    const ids = Array.from(e.target.selectedOptions, (option) => option.value);
    setDataUser(ids);
  };
  return (
    <div className="meeting">
      <div className="row">
        <label className="col-5">Title: </label>
        <input
          className="customInput col-6 offset-1"
          type="text"
          defaultValue={dataTitle}
          key="modalTitle"
          onChange={(e) => setDataTitle(e.target.value)}
        />
      </div>

      <div className="row">
        <label className="col-5">Time: </label>
        <select
          className="buttonLink col-6 offset-1"
          key="modalTime"
          value={dataTime}
          onChange={(e) => setDataTime(e.target.value)}
        >
          <option value={EMPTY_OPTION_TIME.id}>
            {EMPTY_OPTION_TIME.label}
          </option>
          {times.map((t, i) => {
            let disabledOption = meetings.find(
              (e) => e.timeId === t.id && e.dayId === dataDay
            );
            return (
              <option key={i} value={t.id} disabled={disabledOption}>
                {t.title}
              </option>
            );
          })}
        </select>
      </div>

      <div className="row">
        <label className="col-5">Day: </label>
        <select
          className="buttonLink col-6 offset-1"
          key="modalDay"
          value={dataDay}
          onChange={(e) => setDataDay(e.target.value)}
        >
          <option value={EMPTY_OPTION_DAY.id}>{EMPTY_OPTION_DAY.label}</option>
          {days.map((d, i) => {
            let disabledOption = meetings.find(
              (e) => e.timeId === dataTime && e.dayId === d.id
            );
            return (
              <option key={i} value={d.id} disabled={disabledOption}>
                {d.title}
              </option>
            );
          })}
        </select>
      </div>

      <div className="select-user row">
        <label className="col-5">Participants: </label>
        <select
          className="customInput col-6 offset-1"
          key="modalUsers"
          value={dataUser}
          onChange={onChangeUser}
          multiple
        >
          {users.map((u, i) => {
            return (
              <option key={i} value={u.id}>
                {u.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        <Link className="buttonLink col-4" to="/">
          Cancel
        </Link>
        {disabledButton(dataTitle, dataDay, dataTime, dataUser) && (
          <Link
            className="buttonLink col-4 offset-4"
            to="/"
            onClick={() => {
              if (disabledButton(dataTitle, dataDay, dataTime, dataUser)) {
                addMeeting({
                  id: idNewMeeting,
                  dayId: dataDay,
                  timeId: dataTime,
                  title: dataTitle,
                  participants: dataUser
                });
              }
            }}
          >
            Create
          </Link>
        )}
      </div>
    </div>
  );
}
