import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";
import CsPage from "./CsPage";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password")], i18n("auth.passwordChange.mustMatch")),
  phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [initialValues] = React.useState({
    email: "",
    password: "",
    phoneNumber: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({
    email,
    password,
    phoneNumber,
  }) => {
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        phoneNumber
      )
    );
  };

  return (
    <div className="auth__page">
      <div className="header__signup">
        <h1 className="auth__title">{i18n('pages.auth.signup.createAccount')}</h1>
        <span className="auth__description __v2">
          {i18n('pages.auth.signup.signupForAccount')}
        </span>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__form">
            <InputFormItem
              type="text"
              name="email"
              placeholder={i18n("user.fields.username")}
              className="auth__input"
              externalErrorMessage={externalErrorMessage}
            />

            <InputFormItem
              type="tel"
              name="phoneNumber"
              placeholder={i18n("user.fields.phoneNumber")}
              className="auth__input"
            />

            <InputFormItem
              type="password"
              name="password"
              placeholder={i18n("user.fields.password")}
              className="auth__input"
            />

            <InputFormItem
              type="password"
              name="newPasswordConfirmation"
              autoComplete="new-password"
              placeholder={i18n("user.fields.confirmPassword")}
              className="auth__input"
            />

          </div>

          <div className="auth__bottom">
            <button className="auth__button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>{i18n('pages.auth.signup.signupButton')}</span>
            </button>

            <Link to="/auth/signin" className="remove__ligne">
              <span className="auth__link">{i18n('pages.auth.signup.alreadyHaveAccount')}</span>
            </Link>
          </div>
        </form>
      </FormProvider>

      <CsPage />
    </div>
  );
}

export default Signup;
