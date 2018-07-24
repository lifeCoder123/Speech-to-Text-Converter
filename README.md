## Google Speech to text REST API implementation using Recorder.js:

#### [Demo](https://lifecoder123.github.io/Speech-to-Text-Converter/)

Google speech to text API used along with Recorder.js library.It will take audio from Microphone and passes the audio data to Google API Explorer API(REST API).We have used Recorder js library for recording audio through Microphone and Store into Browser in memory database which is called as "Blob" data as audio format.Also shows the recording list after recording has been done.

As Google API accept content data in base64 String format.Now we have converted blob data into base64 format and will send to api.To use REST api samples or you can test API using Google API explorer.

[Google API explorer-REST API](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/speech/recognize)



## Compatablity Instructions:

It will work on all lastest Browsers for eg.Chrome(Version 47+)

Note: Always run project under #### https: protocol beacause it will not allow to pass audio data from Microphone on in secure
Channel.If you use under http: protocol then it will not allow to microphone to capture voice i.e Microphone will not start recording.

Always check Microphone setting in Browser:

#### setting > content settings > Microphone >


## Usage Instructions:

### Google Speech API Access
For Google Cloud speech API use you need API KEY to access API's: Follow Instructions to generate API key to access API:

1. GO to [Google Console](https://console.cloud.google.com/)
2. Create new project or use existing project
3. Goto API Service > Credential
4. Create Credentials >API KEY

### Recorder.js

This file contains all the logic related from recording to send data to API.
Refrerence [Recorder library github](https://github.com/mattdiamond/Recorderjs)

##### Some important points related to recorder.js:
It always use 2 channel by deafult for recording using microphone.So Google speech api only accept this Mono(1) channel audio.Otherwise Google will throw Invalid data

### Formatting Audio to BASE 64(How to Convert Audio to Base64 using JavaScript) 

```javascript
  function convertToBase64(blob){
    // encode base64
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        base64data = reader.result;                
        console.log(base64data);
        base64AudioFormat=base64data;
        console.log("base 64 data",base64AudioFormat);
    }
    // 
}
```

#### Note:

Google API Accept request as JSON format according to audio files ,we have to pass encoding,Samplerates and langauage option
for conversion.For detailed information you can refer following links:

[Google Cloud Speech ](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/speech)

For our project we are passing .Wav file data to Google Following Sample rate

```javascript
 function execute() {
      console.log("audio_url",url);
    return gapi.client.speech.speech.recognize({
      "resource": {
        "audio": {
                      "content": base64AudioFormat
                       //"uri":url

                },
          "config": {
                "enableAutomaticPunctuation": true,
                "encoding": "LINEAR16",
                "languageCode": "en-US",
                "sampleRateHertz": 44100
              
  }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                //responseData.result.results[0].alternatives[0].transcript
                document.getElementById("note_area").innerHTML=response.result.results[0].alternatives[0].transcript + " "
              
              },
              function(err) { console.error("Execute error", err); });
  }
```
SampleRateHertz for:
.FLAC -> 16000
.Wav  -> 44100

### Steps to Run this project:

1. Open index.html in browser.
2. Click "Start Recording" button for start recording.
3. Wait for 10 sec Recording automatically stopped and send base64 data to Google api and response will come.
4. It will display list of Recording list where you can play and download file.
4. In Case After base64 generation are taking time and Speech api will throws 400 Bad request.You can use "execute" button for sending data to API again.It will work properly.


#### [Demo](https://lifecoder123.github.io/Speech-to-Text-Converter/)










