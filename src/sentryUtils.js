// @flow

import { Sentry, SentrySeverity } from "react-native-sentry";

export const DSN =
  "https://1e4fe9d330bb4960a405e64f676a6d49:f0590672e8f74242b199b773a29b8237@sentry.io/191979";

// Function to configure Sentry. Call this when your app mounts

export const configure = () => {
  Sentry.config(DSN).install();
};

// Function to set extra context.
// Use this to include the Redux store in errors sent to Sentry

export const setExtraContext = store => {
  Sentry.setExtraContext({
    store: store.getState()
  });
};
// Function to set tags context.
// Use this to set the environment programmatically
export const setTagsContext = ctx => {
  Sentry.setTagsContext({
    environment: ctx.environment
  });
};
// Function to set user context.
// Use this to send up info about the current logged in user
export const setUserContext = ctx => {
  Sentry.setUserContext(ctx);
};
// Function to report handled errors to Sentry
// I use this if I want to report some API failure
export const captureMessage = msg => {
  Sentry.captureMessage(msg, {
    level: SentrySeverity.Error
  });
};
