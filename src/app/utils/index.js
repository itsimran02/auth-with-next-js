export const userRegistrationFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "please enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "please enter your user email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "please enter your user password",
    componentType: "input",
    type: "password",
  },
];

export const initialSignUpFormData = {
  userName: "",
  email: "",
  password: "",
};
