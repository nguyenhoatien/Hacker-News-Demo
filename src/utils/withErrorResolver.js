export const withErrorResolver =
  (asyncFunction, functionName) =>
  async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      console.error(`An error occurred in function ${functionName}:`, error);
      throw error;
    }
  };
