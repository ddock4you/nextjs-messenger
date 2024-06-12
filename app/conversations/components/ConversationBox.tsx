"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOhterUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOhterUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    if (!userEmail) return;

    const seenArray = lastMessage.seen || [];

    return seenArray.filter((user) => user.email === userEmail).length === 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    {
      if (lastMessage?.image) return "Sent an image";
      if (lastMessage?.body) lastMessage.body;

      return "Started a conversation";
    }
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `relative flex w-full cursor-pointer items-center space-x-3 rounded-lg transition
        hover:bg-neutral-100`,
        selected ? "bg-neutral-100" : "bg-white",
      )}
    >
      <Avatar user={otherUser} />
    </div>
  );
};

export default ConversationBox;
