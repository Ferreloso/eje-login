import {LogLevel} from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "059ca97a-c66b-4aa8-8043-a058de698016",
        authority: "https://login.microsoftonline.com/chihuahua2.tecnm.mx",
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUri: false,
    },
    cache:{
        cacheLocation: "sessionStorage",
        storeAuthSateInCookie: false,
    }
    // ,
    // system: {
    //     loggerOptions: {
    //         loggerCallback: (level, message, containsPii) => {
    //             if(containsPii){
    //                 return;
    //             }
    //             switch(level){
    //                     case LogLevel.Error:
    //                         console.error(message);
    //                         return;
    //                     case LogLevel.Info:
    //                         console.info(message);
    //                         return;
    //                     case LogLevel.Verbose:
    //                         console.debug(message);
    //                         return;
    //                     case LogLevel.Warning:
    //                         console.warn(message);
    //                         return;
    //                     default:
    //                         return;
    //             }
    //         },
    //     },
    // },
};  

export const loginRequest = {
    scopes: ["user.read"],
};