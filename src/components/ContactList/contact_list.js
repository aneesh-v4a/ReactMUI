import { useEffect, useState } from "react";
import Card from "../../widgets/card/card";
import "./contact_list.css";

import { getAllContacts } from "../../services/ContactService";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/ProfileService";
import { Toast } from "../../widgets/toast/toast";

export default function ContactList(props) {
  useEffect(() => {
    getAllContacts()
      .then((contacts) => {
        setError(null);
        if (contacts.data.friends?.length) {
          setToastMessage("Successfully loaded contacts");
          setToastAlive(true);
          setToastType("success");
          setContactList(contacts.data.friends);
        } else {
          setToastMessage("Empty Contacts ! !");
          setToastAlive(true);
          setToastType("info");
        }
      })
      .catch((e) => {
        setToastMessage("Something bad happened");
        setToastAlive(true);
        setToastType("danger");
        setError(e.message);
      });
  }, []);

  const navigate = useNavigate();

  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState(null);
  const [toastAlive, setToastAlive] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const clickHandler = (id) => {
    navigate(`contact/${id}`);
  };

  return (
    <div className="list-container">
      {contactList.length ? (
        contactList.map((contact, i) => (
          <Card
            onClick={() => clickHandler(contact._id)}
            imageService={getProfile}
            size="sm"
            {...contact}
            key={i}
          />
        ))
      ) : (
        <>
          {!error && (
            <p>
              No contacts found. Start adding{" "}
              <Link to={"/contact/add"}>here</Link>
            </p>
          )}
        </>
      )}
      {error ? <p className="error">{error}</p> : null}
      {toastAlive && (
        <Toast
          type={toastType}
          ttl="2000"
          disableHandler={(e) => setToastAlive(!toastAlive)}
          message={toastMessage}
        />
      )}
    </div>
  );
}
