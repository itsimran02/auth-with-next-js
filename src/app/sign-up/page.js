"use client";

import { Label } from "@/components/ui/label";
import {
  initialSignUpFormData,
  userRegistrationFormControls,
} from "../utils";
import { CommonFormElements } from "@/components/form-element";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const signUp = () => {
  const [formData, setFormData] = useState(
    initialSignUpFormData
  );

  const handleSubmitButtonDisable = () =>
    !Object.keys(formData).every(
      (key) => formData[key].trim() !== ""
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading toast and get the toast ID
    const toastId = toast.loading("Loading...");

    try {
      const res = await fetch(
        "http://localhost:3000/api/add-new-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data.data);

      // Show success toast
      toast.success(data.message);
    } catch (error) {
      // Show error toast
      toast.error("Something went wrong: " + error.message);
    } finally {
      // Dismiss the loading toast
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-5 px-5 md:px-10">
      <h1 className="text-center font-bold text-lg">
        Registration
      </h1>
      <form
        className="max-w-[700px] mx-auto flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        {userRegistrationFormControls.map((controls) => {
          return (
            <div key={controls.name}>
              <Label>{controls.label}</Label>
              <CommonFormElements
                currentItem={controls}
                value={formData[controls.name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            </div>
          );
        })}
        <Button
          className="mt-5"
          type="submit"
          disabled={handleSubmitButtonDisable()}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default signUp;
