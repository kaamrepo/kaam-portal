import useLoginStore from "../store/login.store";
const commonPermissionValidator = (havingScopes: string[]): boolean => {
  const { feScopes } = useLoginStore();

  // Check if feScopes contains "ALL"
  if (feScopes.includes("ALL")) {
    return false;
  }

  // Check if all havingScopes are present in feScopes
  return !havingScopes.some((scope) => feScopes.includes(scope));
};

export default commonPermissionValidator;
