import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsal, useMsalAuthentication, useAccount } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

import { Container } from "react-bootstrap";
import { IdTokenData } from "../components/DataDisplay";
import { protectedResources, loginRequest } from "../authConfig";

/*,
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */

export const HomeContent = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  return (
    <>
      {account ? (
        <Container>
          <IdTokenData idTokenClaims={account.idTokenClaims} />
        </Container>
      ) : null}
    </>
  );
};

export const Home = () => {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <AuthenticatedTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <HomeContent />
    </AuthenticatedTemplate>
  );
};
