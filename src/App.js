import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal,MsalProvider } from '@azure/msal-react';
import { loginRequest } from './auth-config';

const WrappedView = () => {
  const {instance} = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () =>{
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error)=>console.log(error));
  };

  return(
    <div className="App">
    <AuthenticatedTemplate>
    {activeAccount ? (
      <p>
          Autenticacion exitosa
        </p>
    ) :null}
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
    <button onClick={handleRedirect}>
    Ingresar
    </button>
    </UnauthenticatedTemplate>
     </div>
  );
};
const App = ({ instance}) =>{
  return(
    <MsalProvider instance={instance}>
      <WrappedView/>
    </MsalProvider>
  );
};
  
export default App;
