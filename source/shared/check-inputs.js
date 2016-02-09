const moduleName = 'React Easy Universal';

const missingError = (param) => (
  `${ moduleName }:: Missing required parameter: ${ param }`
);

const checkInputs = ({ React, routes, reducers }) => {
  if (!React) throw new Error(missingError('React'));
  if (!routes) throw new Error(missingError('routes'));
  if (!reducers) throw new Error(missingError('reducers'));
};

export default checkInputs;
