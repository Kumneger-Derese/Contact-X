const ErrorMessage = ({ error }) => {
  return error ? <div className='mt-1  text-red-400'>{error}</div> : '';
};
export default ErrorMessage;
