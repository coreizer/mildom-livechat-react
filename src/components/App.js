import React, { useEffect, useRef } from "react";
import { useList } from "react-use";
import CardItem from './CardItem'
import xxtea from 'xxtea-node'

const KEY = "32l*!i1^l56e%$xnm1j9i@#$cr&"
const CHANNEL_ID = 12543489

const App = () => {
  const [items, { push }] = useList([])
  const ws = useRef(new WebSocket(
    `wss://jp-room1.mildom.com/?roomId=${CHANNEL_ID}`
  ));

  useEffect(() => {
    document.body.classList.add('bg-slate-900')

    const json = JSON.stringify({
      userId: 0,
      level: 1,
      userName: "guest133700",
      guestId: "pc-gp-e77d4d7b-9d6b-418b-8303-48e5a882d014",
      roomId: CHANNEL_ID,
      reqId: 1,
      cmd: "enterRoom",
      reConnect: 0,
      nobleLevel: 0,
      avatarDecortaion: 0,
      enterroomEffect: 0,
      nobleClose: 0,
      nobleSeatClose: 0
    });

    const base64 = xxtea.encrypt(
      xxtea.toBytes(json),
      xxtea.toBytes(KEY)
    )

    const metadata = new ArrayBuffer(4);
    new DataView(metadata).setUint32(0, base64.length, false)
    const buffer = new Uint8Array(8 + base64.length)
    buffer.set([
      0,
      4,
      1,
      1,
    ], 0)
    buffer.set(
      new Uint8Array(metadata),
      4
    )
    buffer.set(base64, 8)

    console.log("Final buffer:", buffer, buffer.byteLength);

    // WebSocket 接続を作成
    // バイナリーの型を "blob" から "arraybuffer" に変更
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      console.log("Websocket Open!");
      ws.current.send(buffer)
    };

    ws.current.onmessage = (response) => {
      if (response.data instanceof ArrayBuffer) {
        const decrypted = xxtea.decrypt(
          new Uint8Array(response.data).slice(8),
          xxtea.toBytes(KEY)
        );

        push(
          JSON.parse(xxtea.toString(decrypted))
        )
      }
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl pt-4 pb-8 text-slate-100 font-semibold">ライブチャット</h2>
      <ul className="space-y-5 pb-8">
        {items.map((item, index) => {
          return <CardItem key={index} item={item} />
        })}
      </ul>
    </div>
  )
}

export default App;