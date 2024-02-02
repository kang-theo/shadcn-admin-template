import React from "react";

function AuthError() {
  // catch error in query parameter
  // Error code passed in query string as ?error=????
  // Example: /auth/error?error=Configuration
  return <div>Failed to authenticate</div>;
}

export default AuthError;
