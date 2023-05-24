/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { MsalProvider, useMsal } from "@azure/msal-react";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";
import { TextInput } from "./pages/TextInput";

import "./styles/App.css";

const Pages = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress value
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();

  return (
    <Routes>
      {/* <Route path="/todolist" element={<TodoList />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/textinput" element={<TextInput />} />
    </Routes>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <Pages />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
