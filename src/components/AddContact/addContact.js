import { useRef, useState } from "react";
import "./addContact.css";
import { imageResizer } from "../../utils/resize";
import { addContact } from "../../services/ContactService";
import { uploadProfile } from "../../services/ProfileService";
import { useNavigate } from "react-router-dom";

export default function AddContact(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [binary, setBinary] = useState(null);

  const navigate = useNavigate();

  // ref to change the background image of div
  const imgRef = useRef(null);

  // Handler to convert image file to base64 and change the background image
  const imageChangeHandler = async (e) => {
    const file = e.target.files[0];
    const resizedImage = await imageResizer(file, 300, 300, file.type);
    imgRef.current.style.backgroundImage = `url("${resizedImage.base64}")`;
    imgRef.current.style.backgroundSize = `cover`;
    setBinary(resizedImage.base64);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const textData = new FormData();
    const imageData = new FormData();
    textData.append("name", name);
    textData.append("phone", phone);
    textData.append("email", email);
    addContact(textData).then((res) => {
      const userId = res.data.record;
      if (binary) {
        imageData.append("image", binary);
        uploadProfile(userId, imageData).then((data) => navigate("/"));
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="add-container">
      <div className="title">
        <p>Add New Contact</p>
      </div>
      <div className="contact-outer">
        <div className="contact-img" ref={imgRef}>
          <label htmlFor="getFile">
            <input
              type="file"
              id="getFile"
              onChange={imageChangeHandler}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={submitHandler} className="add-form">
          <label>Name</label>
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label>Phone</label>
          <input
            type={"text"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
