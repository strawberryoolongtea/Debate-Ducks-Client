import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import Room from "../../../components/debateroom/Room";

export default function Debateroom() {
  const router = useRouter();
  const { debateId, isPros } = router.query; //! 임시 쿼리
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);
  }, []);

  return (
    <Room
      debateId={debateId}
      socket={socketRef}
      isPros={isPros === "true" ? true : false} //! 임시 props
    />
  );
}
