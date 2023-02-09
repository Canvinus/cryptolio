export const ErrorMessage = ({message}) => {
    return (
        <div className='message-container'>
            <article className="message empty-error is-danger">
              <div className="message-body">
                {message}
              </div>  
            </article>
          </div>
    );
}