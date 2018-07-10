Recorder and Google speech to text REST API using Javascript:

All code it is in index.html file.

Steps for running for intial testing after that we make them as per our convenience:

1.Start recording 
2.Speak properly with microphone.
3.Ensure that you are accessing file which is uses https protocol rather than http.
4.Then stop recording and wait for base64 format generated.I have written all in console.You can check it using Developer console.
5.Now Send data audio to Google speech API using Java script,So Click on "Authorize and Load" button for making user authenticate to google.Here we will make it directly login with fixed account.
6.Now Click on "exceute" button check developer console and network console for response check.
7.If it gives the 403 forbidden access then use Approprate client ID which enable billing account for keys.replace Client ID

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: '713171281104-1dkjs4lci5qpobse7qfo9bdalccraera.apps.googleusercontent.com'});
  });
  
 Demo: https://wasimofficial123.github.io/google-speech/
