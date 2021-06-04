import { useEffect, useState } from "react";
import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Accounts() {
  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    await Axios.get("http://localhost:3001/accounts").then((response) => {
      setAccountsList(response.data.reverse());
    });
  };

  const deleteAccount = async (_id) => {
    await Axios.delete(`http://localhost:3001/accounts/${_id}`);
    getAccounts();
  };

  return (
    <div className="container">
      <hr />
      <Link className="btn-primary btn" to="/">
        Back
      </Link>
      <table className="table container shadow-lg mt-5">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">
              Balance ( <FontAwesomeIcon icon="rupee-sign" size="1x" /> )
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {accountsList.map((val, key) => {
            return (
              <tr key={val._id}>
                <td>{key+1}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.balance}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/accounts/view/${val._id}`}
                  >
                    <FontAwesomeIcon
                      icon="money-bill"
                      size="1x"
                      className="mr-2"
                    />
                    View and Transfer Money
                  </Link>
                  <Link
                    className="btn btn-outline-success mr-2"
                    to={`/accounts/edit/${val._id}`}
                  >
                    <FontAwesomeIcon icon="edit" size="1x" className="mr-2" />
                    Edit
                  </Link>
                  <span
                    className="btn btn-outline-danger mr-2"
                    onClick={() => deleteAccount(val._id)}
                  >
                    <FontAwesomeIcon
                      icon="trash-alt"
                      size="1x"
                      className="mr-2"
                    />
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Accounts;
