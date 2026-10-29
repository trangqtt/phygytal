import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastEnum } from '../../../enum/toast';

type ToastifyProps = {
  children: React.ReactNode;
};
const Toastify = ({ children }: ToastifyProps) => {

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {children}
    </div>
  );
};

export default Toastify;
