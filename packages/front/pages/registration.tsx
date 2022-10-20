import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

enum Status {
  WaitingToSend,
  Sent,
  WaitingToVerify,
}

const Registration = () => {
  const [status, setStatus] = useState<Status>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch(status) {
      case Status.Sent: {
        setStatus(Status.WaitingToVerify);
        break;
      }
      default: {
        setStatus(Status.WaitingToSend);
        setTimeout(() => {
          setStatus(Status.Sent);
          toast.success("Please check your inbox.");
        }, 1000);
        break;
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card bg-neutral w-96 mx-8">
        <div className="card-body w-full items-center">
          <h2 className="card-title">
            { (status === Status.Sent || status === Status.WaitingToVerify ) ? 'Enter OTP' : 'Enter Your Email'}
          </h2>
          <form className="mt-8 w-full" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="input input-primary w-full"
            />
            { (status === Status.Sent || status === Status.WaitingToVerify ) && (
              <input
                type="number"
                placeholder="OTP"
                className="input input-primary mt-4 w-full"
              ></input>
            ) }
            <button
              className={`btn ${
                (status === Status.WaitingToSend ||
                  status === Status.WaitingToVerify) &&
                'loading'
              } w-full btn-primary mt-8 text-white`}
            >
              {status === Status.WaitingToSend ||
              status === Status.WaitingToVerify
                ? 'Please Wait'
                : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Registration;
