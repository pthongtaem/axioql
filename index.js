import axios from 'axios';

const { modifyQuery } = require('./lib/queryModifier');

let ENDPOINT = null;

const setQLEndpoint = (endpoint) => ENDPOINT = endpoint;

const axioql = async ({ query, variables } = { query: null, variables: null }) => {
  if (!query) throw new Error('Query is required!');
  if (!ENDPOINT) throw new Error('Endpoint is required. Use setQLEndpoint(endpoint: string) method.');

  const modifiedQuery = modifyQuery(query);
  const stringifiedVariables = JSON.stringify(variables);

  try {
    const response = await axios.post(ENDPOINT, {
      query: modifiedQuery,
      variables: stringifiedVariables,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export { setQLEndpoint };
export default axioql;
