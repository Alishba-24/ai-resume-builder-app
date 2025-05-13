import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Login from "./Login";
import Register from "./Register";

const ModalManager = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  setIsLoggedIn
}) => {
  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to your account</DialogTitle>
          </DialogHeader>
          <Login 
            setIsLoggedIn={setIsLoggedIn} 
            closeModal={() => setIsLoginModalOpen(false)}
            openRegisterModal={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new account</DialogTitle>
          </DialogHeader>
          <Register 
            closeModal={() => setIsRegisterModalOpen(false)}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalManager;