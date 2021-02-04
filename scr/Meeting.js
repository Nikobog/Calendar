import React, { useState } from "react";
import { Link } from "react-router-dom";
import { days, times, users } from "./pages/constants";

export const Meeting = (props) => {
  const { data, meetings, saveChanges, deleteMeeting } = props;
  const [dataTitle, setDataTitle] = useState(data.title);
  const [dataDay, setDataDay] = useState(data.dayId);
  const [dataTime, setDataTime] = useState(data.timeId);
  const [dataUser, setDataUser] = useState(data.participants);
  const [changeMeeting, setChangeMeeting] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const onChangeTitle = (e) => {
    setDataTitle(e.target.value);
    setChangeMeeting(true);
  };

  const onChangeTime = (e) => {
    setDataTime(e.target.value);
    setChangeMeeting(true);
  };
  const onChangeDay = (e) => {
    setDataDay(e.target.value);
    setChangeMeeting(true);
  };

  const onChangeUser = (e) => {
    const ids = Array.from(e.target.selectedOptions, (option) => option.value);
    setDataUser(ids);
    setChangeMeeting(true);
  };

  return (
    <div>
      <div className="meetingPlace">
        <div className="meeting-cell" onClick={openModal}>
          <span>{dataTitle}</span>
        </div>
        <button className="buttonClose" onClick={openDeleteModal}>
          X
        </button>
        {deleteModal && (
          <div className="deleteModal row">
            <div className="deleteModalText">
              Are you sure you want to delete "{dataTitle}" event?
            </div>
            <button className="buttonLink col-5" onClick={closeDeleteModal}>
              No
            </button>
            <button
              id={data.id}
              className="buttonLink col-5 offset-2"
              onClick={deleteMeeting}
            >
              Yes
            </button>
          </div>
        )}
      </div>
      {open && !deleteModal && (
        <div className="meeting container">
          <button className="buttonClose" onClick={closeModal}>
            Х
          </button>
          <div className="row">
            <label className="col-5">Title: </label>
            <input
              className="col-6 offset-1 customInput"
              type="text"
              defaultValue={dataTitle}
              key="modalTitle"
              onChange={onChangeTitle}
            />
          </div>

          <div className="row">
            <label className="col-5">Time: </label>
            <select
              className="buttonLink col-6 offset-1"
              key="modalTime"
              value={dataTime}
              onChange={onChangeTime}
            >
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
              onChange={onChangeDay}
            >
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
              className="col-6 offset-1 customInput"
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
          {changeMeeting && (
            <Link
              className="buttonLink"
              to="/"
              onClick={() => {
                closeModal();
                saveChanges({
                  id: data.id,
                  dayId: dataDay,
                  timeId: dataTime,
                  title: dataTitle,
                  participants: dataUser
                });
              }}
            >
              Save Changes
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
