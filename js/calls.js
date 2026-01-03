const peer = new RTCPeerConnection();
navigator.mediaDevices.getUserMedia({ video:true, audio:true })
  .then(stream => {
    localVideo.srcObject = stream;
    stream.getTracks().forEach(t => peer.addTrack(t, stream));
  });
