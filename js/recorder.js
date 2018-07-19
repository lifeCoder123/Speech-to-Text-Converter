// Expose globally your audio_context, the recorder instance and audio_stream
var audio_context;
var recorder;
var audio_stream;
var base64AudioFormat;
var url;

/**
 * Patch the APIs for every browser that supports them and check
 * if getUserMedia is supported on the browser. 
 * 
 */
function Initialize() {
    try {
        // Monkeypatch for AudioContext, getUserMedia and URL
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        // Store the instance of AudioContext globally
        audio_context = new AudioContext;
        console.log('Audio context is ready !');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
        alert('No web audio support in this browser!');
    }
}

/**
 * Starts the recording process by requesting the access to the microphone.
 * Then, if granted proceed to initialize the library and store the stream.
 *
 * It only stops when the method stopRecording is triggered.
 */
function startRecording() {
    // Access the Microphone using the navigator.getUserMedia method to obtain a stream
    navigator.getUserMedia({ audio: true }, function (stream) {
        // Expose the stream to be accessible globally
        audio_stream = stream;
        
        // Create the MediaStreamSource for the Recorder library
        var input = audio_context.createMediaStreamSource(stream);
        console.log('Media stream succesfully created',input);

        // Initialize the Recorder Library
        recorder = new Recorder(input);
        console.log('Recorder initialised',recorder);
    
        

        // Start recording !
        recorder && recorder.record();
        console.log('Recording...');
        
        
        

        // Disable Record button and enable stop button !
        document.getElementById("start-btn").disabled = true;
        document.getElementById("stop-btn").disabled = false;
    }, function (e) {
        console.error('No live audio input: ' + e);
    });
    setTimeout( function(){ 
        console.log("before 1");
        stopRecordInterval();
        execute();
      }  , 10000 );
}

function stopRecordInterval(){
    //This function is used to stop recording after some time of interval
    
    var _AudioFormat = "audio/wav";
    stopRecording(function(AudioBLOB){
        // Note:
        // Use the AudioBLOB for whatever you need, to download
        // directly in the browser, to upload to the server, you name it !

        // In this case we are going to add an Audio item to the list so you
        // can play every stored Audio

        
        
        url = URL.createObjectURL(AudioBLOB);
       
        console.log("blob URL",url);
        convertToBase64(AudioBLOB);
       
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');

        au.controls = true;
        au.src = url;
        hf.href = url;
        // Important:
        // Change the format of the file according to the mimetype
        // e.g for audio/wav the extension is .wav 
        //     for audio/mpeg (mp3) the extension is .mp3
        hf.download = new Date().toISOString() + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        recordingslist.appendChild(li);
    }, _AudioFormat);
    console.log("after 1 sec");
}

/**
 * Stops the recording process. The method expects a callback as first
 * argument (function) executed once the AudioBlob is generated and it
 * receives the same Blob as first argument. The second argument is
 * optional and specifies the format to export the blob either wav or mp3
 */
function stopRecording(callback, AudioFormat) {
    // Stop the recorder instance
    recorder && recorder.stop();
    console.log('Stopped recording.');

    // Stop the getUserMedia Audio Stream !
    audio_stream.getAudioTracks()[0].stop();

    // Disable Stop button and enable Record button !
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;

    // Use the Recorder Library to export the recorder Audio as a .wav file
    // The callback providen in the stop recording method receives the blob
    if(typeof(callback) == "function"){

        /**
         * Export the AudioBLOB using the exportWAV method.
         * Note that this method exports too with mp3 if
         * you provide the second argument of the function
         */
        recorder && recorder.exportWAV(function (blob) {
            callback(blob);

            // create WAV download link using audio data blob
            // createDownloadLink();

            // Clear the Recorder to start again !
            recorder.clear();
        }, (AudioFormat || "audio/wav"));
    }
}

// Initialize everything once the window loads
window.onload = function(){
    // Prepare and check if requirements are filled
    Initialize();

    // Handle on start recording button
    document.getElementById("start-btn").addEventListener("click", function(){
        startRecording();
    }, false);

    // Handle on stop recording button
    document.getElementById("stop-btn").addEventListener("click", function(){
        // Use wav format
        var _AudioFormat = "audio/wav";
        // You can use mp3 to using the correct mimetype
        //var AudioFormat = "audio/mpeg";

        // stopRecording(function(AudioBLOB){
        //     // Note:
        //     // Use the AudioBLOB for whatever you need, to download
        //     // directly in the browser, to upload to the server, you name it !

        //     // In this case we are going to add an Audio item to the list so you
        //     // can play every stored Audio

            
            
        //     var url = URL.createObjectURL(AudioBLOB);
        //     console.log("blob URL",url);
        //     convertToBase64(AudioBLOB);
           
        //     var li = document.createElement('li');
        //     var au = document.createElement('audio');
        //     var hf = document.createElement('a');

        //     au.controls = true;
        //     au.src = url;
        //     hf.href = url;
        //     // Important:
        //     // Change the format of the file according to the mimetype
        //     // e.g for audio/wav the extension is .wav 
        //     //     for audio/mpeg (mp3) the extension is .mp3
        //     hf.download = new Date().toISOString() + '.wav';
        //     hf.innerHTML = hf.download;
        //     li.appendChild(au);
        //     li.appendChild(hf);
        //     recordingslist.appendChild(li);
        // }, _AudioFormat);
    }, false);
};

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
function sendBase64Data(data){
    return data;
}


//Google Api code

/**
   * Sample JavaScript code for speech.speech.recognize
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/cloud-platform"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/speech/v1/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//       authenticate();   
//     console.log("Window base64 value",base64AudioFormat);
//     return gapi.client.speech.speech.longrunningrecognize({
//       "resource": {
//         "audio": {
//           "content": base64AudioFormat 
//         }
        
//       }
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init(
//         {
//             client_id: 'YOUR CLIENT ID',
//             key:'YOUR API KEY'
//         });
//   });


// End google api codes



// Google api access using Api Key without authentication/private user access data

function loadClient() {
    console.log("loaded client googke");
    gapi.client.setApiKey('AIzaSyDCdr7QiWIu8bVrQ1D6Y984uZAbF_K0ipQ');
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/speech/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
      console.log("audio_url",url);
    return gapi.client.speech.speech.recognize({
      "resource": {
        "audio": {
                      //"content": "VGhpcyBpcyBhbiBhd2Vzb21lIHNjcmlwdA=="
                       "uri":url

                },
          "config": {
                //"encoding": "FLACH",
                 //"languageCode": "en-US",
                 //"sampleRateHertz": 16000
  }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client",loadClient);
// gapi.client.init({
//     'apiKey': 'YOUR_API_KEY',
   
//   }).then(function(){
//       console.log("intialize the gapi with api key");

//   });


// End of google api using key
