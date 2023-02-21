import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOneContact,
  removeContact,
  updateContact,
} from "../../services/ContactService";
import {
  getProfile,
  removeProfile,
  uploadProfile,
} from "../../services/ProfileService";
import { imageResizer } from "../../utils/resize";
import { ConfirmBox } from "../../widgets/confirmBox/confirmBox";
import { Toast } from "../../widgets/toast/toast";
import "./details.css";

export default function Details(props) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [stateCopy, setStateCopy] = useState({});
  const [isDelete, setIsDelete] = useState(false);

  const [toastAlive, setToastAlive] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMsg, setToastMsg] = useState("");

  const imgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOneContact(id).then((contact) => {
      setName(contact.data.friend.name);
      setEmail(contact.data.friend.email);
      setPhone(contact.data.friend.phone);
    });
  }, [id]);

  useEffect(() => {
    getProfile(id).then((resp) => {
      imgRef.current.style.backgroundImage = `url(${resp.data.file})`;
    });
  }, [id]);

  function createCopy() {
    setStateCopy({
      name,
      email,
      phone,
    });
  }

  const editHandler = (e) => {
    setIsEdit(true);
    setToastAlive(true);
    setToastType("warn");
    setToastMsg("Edit mode ON");
    createCopy();
  };

  const resetHandler = (e) => {
    setEmail(stateCopy.email);
    setPhone(stateCopy.phone);
    setName(stateCopy.name);
    setIsEdit(false);
    setStateCopy({});
    setToastMsg("Canceled Edit");
    setToastType("info");
    setToastAlive(true);
  };

  const saveHandler = (e) => {
    const contactObj = { name, email, phone };
    updateContact(contactObj, id).then((resp) => setIsEdit(false));
  };

  const deleteHandler = (e) => {
    setIsDelete(false);
    removeContact(id)
      .then((resp) =>
        removeProfile(id)
          .then((res) => navigate("/"))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  const uploadProfileHandler = async (e) => {
    const formData = new FormData();
    const imgString = await imageResizer(
      e.target.files[0],
      300,
      300,
      e.target.files[0].type
    );
    formData.append("image", imgString.base64);
    uploadProfile(id, formData).then((profile) => {
      imgRef.current.style.backgroundImage = `url("${imgString.base64}")`;
      imgRef.current.style.backgroundSize = `cover`;
    });
  };

  const actionsTemplate = (
    <div className="actions">
      {!isEdit ? (
        <button className="edit-btn" onClick={editHandler}></button>
      ) : (
        ""
      )}
      {isEdit ? (
        <button className="save-btn" onClick={saveHandler}></button>
      ) : (
        ""
      )}
      {!isEdit ? (
        <button
          className="delete-btn"
          onClick={(e) => setIsDelete(true)}
        ></button>
      ) : (
        ""
      )}
      {isEdit ? (
        <button className="cancel-btn" onClick={resetHandler}></button>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div className="detail-container">
      {actionsTemplate}
      <div className="detail-top"></div>
      <div className="detail-left"></div>
      <div className="contact-outer">
        <div className="contact-img" ref={imgRef}>
          <label htmlFor="getFile">
            <input
              type="file"
              id="getFile"
              onChange={uploadProfileHandler}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
      </div>
      <div className="detail-right">
        <div>
          <span>&#128231;</span>
          {isEdit ? (
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          ) : (
            <p> {email}</p>
          )}
        </div>
        <div>
          <span>&#x260E;</span>
          {isEdit ? (
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          ) : (
            <p>{phone}</p>
          )}
        </div>
      </div>
      <div className="detail-bottom">
        {isEdit ? (
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        ) : (
          <p>{name}</p>
        )}
      </div>
      {isDelete ? (
        <ConfirmBox
          backDropCancel={true}
          message="Are sure you want to delete ?"
          confirmHandler={(e) => (e ? deleteHandler() : setIsDelete(false))}
        />
      ) : null}
      {toastAlive && (
        <Toast
          type={toastType}
          ttl="2000"
          disableHandler={(e) => setToastAlive(!toastAlive)}
          message={toastMsg}
        />
      )}
    </div>
  );
}
