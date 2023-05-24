import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";

export const useAccessToken = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const getAccessToken = async () => {
    const silentRequest = {
      scopes: protectedResources.apiTodoList.scopes.read, // API のスコープを指定
      account: account,
    };
    try {
      const response = await instance.acquireTokenSilent(silentRequest);
      const accessToken = response.accessToken;
      return accessToken;
    } catch (error) {
      console.log("Failed to acquire access token:", error);
      return null;
    }
  };

  return { getAccessToken };
};
