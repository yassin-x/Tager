import { FormPagesType } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const loginFields = (): IFormField[] => [
    {
      label: "Username Or Email",
      name: "username",
      type: "text",
      autoFocus: true,
      required: true,
      placeholder: "Username Or Email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "********",
    },
  ];

  const registerFields = (): IFormField[] => [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      autoFocus: true,
      required: true,
      placeholder: "First Name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      required: true,
      placeholder: "Last Name",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      required: true,
      placeholder: "Username",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "********",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      placeholder: "Phone Number",
    },
    {
      label: "Country",
      name: "country",
      type: "text",
      required: true,
      placeholder: "Country",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case FormPagesType.Login:
        return loginFields();
      case FormPagesType.Register:
        return registerFields();
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
