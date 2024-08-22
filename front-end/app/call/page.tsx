"use client"
import { useState, useEffect, useRef } from "react";

export default function VoiceCall() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [friendUsername, setFriendUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasIncomingCall, setHasIncomingCall] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [friendName, setFriendName] = useState("");

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  const stringeeClient = new StringeeClient();
  let call:any = null; // call handler

  useEffect(() => {
    stringeeClient.on("connect", () => console.log("Connected to StringeeServer"));

    stringeeClient.on("authen", (res:any) => {
      if (res.message === "SUCCESS") {
        setLoggedIn(true);
      }
    });

    stringeeClient.on("incomingcall", (incomingcall:any) => {
      console.log("incomingcall", incomingcall);
      call = incomingcall;
      settingCallEvent(incomingcall);
      setHasIncomingCall(true);

      setFriendName(incomingcall.fromNumber);
      setLoading(true);
    });
  }, []);

  function settingCallEvent(call1:any) {
    call1.on("addremotestream", function (stream:any) {
      console.log("addremotestream");
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = null;
        remoteVideo.current.srcObject = stream;
      }
    });

    call1.on("addlocalstream", function (stream) {
      console.log("addlocalstream");
      if (localVideo.current) {
        localVideo.current.srcObject = null;
        localVideo.current.srcObject = stream;
      }
    });

    call1.on("signalingstate", function (state) {
      console.log("signalingstate ", state);

      setCallStatus(state.reason);

      if (state.code === 3) {
        setIsCalling(true);
      } else if ([4, 5, 6].includes(state.code)) {
        setIsCalling(false);
        setLoading(false);
        setHasIncomingCall(false);
      }
    });

    call1.on("mediastate", function (state) {
      console.log("mediastate ", state);
    });

    call1.on("info", function (info) {
      console.log("on info:" + JSON.stringify(info));
    });
  }

  const onLogin = async () => {
    const res = await fetch(
      `http://localhost/test/stringee/generate-access-token/?u=${username}`
    );

    const data = await res.json();

    setAccessToken(data.access_token);
    stringeeClient.connect(data.access_token);
  };

  const onCall = async () => {
    if (username === friendUsername) {
      alert("Không thể gọi cho chính mình");
      return;
    }

    if (isCalling) {
      return;
    }

    setLoading(true);

    call = new StringeeCall(stringeeClient, username, friendUsername, false);
    settingCallEvent(call);

    call.makeCall(function (res) {
      console.log("make call callback: " + JSON.stringify(res));
      setFriendName(res.toNumber);
    });
  };

  const acceptCall = () => {
    call.answer(function (res) {
      console.log("answer call callback: " + JSON.stringify(res));
      setHasIncomingCall(false);
      setIsCalling(true);
    });
  };

  const rejectCall = () => {
    call.reject(function (res) {
      console.log("reject call callback: " + JSON.stringify(res));
      setHasIncomingCall(false);
      setLoading(false);
    });
  };

  const hangupCall = () => {
    call.hangup(function (res) {
      console.log("hangup call callback: " + JSON.stringify(res));
      setIsCalling(false);
      setLoading(false);
    });
  };

  return (
    <div className="row">
      <div className="col">
        <h1>Demo: Voice Call</h1>

        <p>
          Trạng thái: {loggedIn ? `đã đăng nhập (${username})` : "chưa đăng nhập"}
        </p>

        {!loggedIn ? (
          <form onSubmit={onLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="username"
                placeholder="Nhập tên đăng nhập"
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Đăng nhập
            </button>
          </form>
        ) : (
          <form onSubmit={onCall}>
            <div className="mb-3">
              <label htmlFor="friend-username" className="form-label">
                Bạn muốn gọi cho ai?
              </label>
              <input
                type="text"
                value={friendUsername}
                onChange={(e) => setFriendUsername(e.target.value)}
                className="form-control"
                id="friend-username"
                placeholder="Nhập ID bạn bè"
                disabled={isCalling || loading}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Đang gọi..." : "Gọi"}
            </button>
          </form>
        )}

        {hasIncomingCall && (
          <div className="mt-3">
            <p>
              Bạn nhận được cuộc gọi từ: <strong>{call?.fromNumber}</strong>
            </p>

            <button className="btn btn-primary me-3" onClick={acceptCall}>
              Trả lời
            </button>
            <button className="btn btn-danger" onClick={rejectCall}>
              Từ chối
            </button>
          </div>
        )}

        {isCalling && (
          <div className="mt-3">
            <p>
              Đang gọi cho: <strong>{friendName}</strong>
            </p>

            <button className="btn btn-danger" onClick={hangupCall}>
              Kết thúc
            </button>
          </div>
        )}

        <div>
          <video ref={localVideo} autoPlay muted style={{ width: "150px" }}></video>
          <video ref={remoteVideo} autoPlay style={{ width: "150px" }}></video>
        </div>
      </div>
    </div>
  );
}
