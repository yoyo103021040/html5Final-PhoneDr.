/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);

function onVolumeUpKeyDown() {
    alert("音量鍵(大)正常");
}
//音量鍵大

document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);

function onVolumeDownKeyDown() {
    alert("音量鍵(小)正常");
}

//音量鍵小

document.getElementById("networkInfo").addEventListener("click", networkInfo);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function networkInfo() {
   var networkState = navigator.connection.type;
   var states = {};
	
   states[Connection.UNKNOWN]  = '未知連線';
   states[Connection.ETHERNET] = '乙太網路';
   states[Connection.WIFI]     = 'WiFi連線';
   states[Connection.CELL_2G]  = '使用2G';
   states[Connection.CELL_3G]  = '使用3G';
   states[Connection.CELL_4G]  = '使用4G';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';

   alert('Connection type: ' + states[networkState]);
}

function onOffline() {
   alert('You are now offline!');
}

function onOnline() {
   alert('You are now online!');
}

//網路


document.getElementById("vibration").addEventListener("click", vibration);
function vibration() {
   var time = 3000;
   navigator.vibrate(time);
}
//震動

document.getElementById("getPosition").addEventListener("click", getPosition);
function getPosition() {

   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
	
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {

      alert('緯度: '          + position.coords.latitude          + '\n' +
         '經度: '         + position.coords.longitude         + '\n' +
         '海拔: '          + position.coords.altitude          + '\n' +
         '水平: '          + position.coords.accuracy          + '\n' +
         '地平線: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

//定位
document.getElementById("watchPosition").addEventListener("click", watchPosition);
function watchPosition() {

   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }

   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {

      alert('緯度: '          + position.coords.latitude          + '\n' +
         '經度: '         + position.coords.longitude         + '\n' +
         '海拔: '          + position.coords.altitude          + '\n' +
         '水平: '          + position.coords.accuracy          + '\n' +
         '地平線: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }

}
//追蹤

document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);
function cordovaDevice() {
   alert("Cordova version: " + device.cordova + "\n" +
      "Device model: " + device.model + "\n" +
      "Device platform: " + device.platform + "\n" +
      "Device UUID: " + device.uuid + "\n" +
      "Device version: " + device.version);
}
//裝置
document.getElementById("audioCapture").addEventListener("click", audioCapture);
function audioCapture() {

   var options = {
      limit: 1,
      duration: 10
   };

   navigator.device.capture.captureAudio(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
		
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('錄音功能異常'+'Error code: ' + error.code, null);
   }
	
}
//錄音

document.getElementById("imageCapture").addEventListener("click", imageCapture);
function imageCapture() {

   var options = {
      limit: 1
   };

   navigator.device.capture.captureImage(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
		
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('照相功能異常'+'Error code: ' + error.code, null );
   }
	
}
//照相

document.getElementById("videoCapture").addEventListener("click", videoCapture);
function videoCapture() {

   var options = {
      limit: 1,
      duration: 10
   };

   navigator.device.capture.captureVideo(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
		
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('錄影功能異常'+'Error code: ' + error.code, null);
   }
	
}
//錄影
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};