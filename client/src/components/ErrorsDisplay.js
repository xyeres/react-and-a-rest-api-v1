/**
  * Renders validation errors if they are present in a form
*/
export default function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
          <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      );
    }
  
    return errorsDisplay;
  }
  