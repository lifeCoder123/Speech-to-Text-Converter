## Google Speech to text REST API implementation using Recorder.js:

Google speech to text API used along with Recorder.js library.It will take audio from Microphone and passes the audio data to Google API Explorer API(REST API).We have used Recorder js library for recording audio through Microphone and Store into Browser in memory database which is called as "Blob" data as audio format.Also shows the recording list after recording has been done.

As Google API accept content data in base64 String format.Now we have converted blob data into base64 format and will send to api.To use REST api samples or you can test API using Google API explorer.

[Google API explorer-REST API](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/speech/recognize)



## Compatablity Instructions:

It will work on all lastest Browsers for eg.Chrome(Version 47+)

Note: Always run project under #### https: protocol beacause it will not allow to pass audio data from Microphone on in secure
Channel.If you use under http: protocol then it will not allow to microphone to capture voice i.e Microphone will not start recording.

Always check Microphone setting in Browser:

#### [setting > content settings > Microphone >]()
