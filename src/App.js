import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';
import { loginRequest } from './auth-config';
import { useState, useEffect } from 'react';

const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (activeAccount) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: activeAccount
          });

          // Hacer una solicitud al punto de extremo de Microsoft Graph u otro punto de extremo para obtener los datos del usuario
          const userProfileResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          const userData = await userProfileResponse.json();
          setUserData(userData);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    };

    fetchData();
  }, [instance, activeAccount]);

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    instance.logout();
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <>
            <p>Autenticación exitosa</p>
            {userData && (
              <div>
                <h2>Perfil de Usuario</h2>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Nombre:</strong></td>
                      <td>{userData.displayName}</td>
                    </tr>
                    <tr>
                      <td><strong>Correo electrónico:</strong></td>
                      <td>{userData.mail}</td>
                    </tr>
                    <tr>
                      <td><strong>Foto de perfil:</strong></td>
                      <td>
                        {userData.photo ? (
                          <img src={userData.photo} alt="Foto de perfil" />
                        ) : (
                          <span>No hay foto de perfil disponible</span>
                        )}
                      </td>
                    </tr>
                    {/* Otros datos del usuario */}
                  </tbody>
                </table>
                <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
              </div>
            )}
          </>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect} id='btnIngresar'>
          Ingresar
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  );
};

export default App;
