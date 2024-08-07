// components/MetaThreadCard.tsx
"use client";
import Image from "next/image";
import {
  RepostIcon,
  ThreeDotIcon,
} from "../../../public/assests/Images";
import DummyUserIcon from "../../../public/assests/profile-picture.png";
import { timeAgo } from "@/helpers/CalculateTime";
import Link from "next/link";
import Threadbutton from "../uiCompoents/Threadbutton";
import { useRouter } from "next/navigation";

interface ThreadCardProps {
  br?: boolean;
  id: any;
  author: string;
  contentSnippet: string;
  commentsCount: number;
  upvotes: any[];
  reposts: any[];
  timestamp: Date;
  authorId: any;
  isRepost: boolean;
  repostauthor?: any;
  repostTime?: any;
  originalThread: any;
  isQuote?:boolean,
}

const RepostCard: React.FC<ThreadCardProps> = ({
  br = true,
  id,
  author,
  authorId,
  contentSnippet,
  commentsCount,
  upvotes,
  reposts,
  timestamp,
  isRepost,
  repostauthor,
  repostTime,
  originalThread,
  isQuote,
}) => {
  const router = useRouter();
  const quote = originalThread.originalThread;

  function handleclick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${authorId}`);
  }

  function handleUsernameClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${repostauthor._id}`);
  }

  function originalThreadclick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/thread/${quote._id}`);
  }

  function quoteusernameclick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${quote.author._id}`);
  }

  return (
    <div>
      {isRepost && repostauthor && (
        <div className="flex gap-2 items-center justify-start text-slate-400 px-5 py-2">
          {RepostIcon({
            fill: "#9CA3AF",
            width: 16,
            height: 16,
          })}
          <button className="hover:underline" onClick={handleUsernameClick}>
            @{repostauthor.username}
          </button>
          <span>reposted {timeAgo(repostTime)}</span>
        </div>
      )}
      <Link href={`/thread/${id}`} passHref>
        <div
          className={`bg-[#181818] overflow-hidden ${
            br ? "border-b-[.05rem] border-[#323232]" : ""
          } py-4 px-8`}
        >
          <div className="flex items-start">
            <Image
              src={DummyUserIcon}
              alt={author || ""}
              className="w-10 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h3
                    onClick={handleclick}
                    className="text-base font-semibold text-slate-200 hover:underline"
                  >
                    {author && "@" + author}
                  </h3>
                  <p className="text-gray-400 text-sm">{timeAgo(timestamp)}</p>
                </div>
                <div className="text-gray-400">
                  <button>
                    {ThreeDotIcon({
                      fill: "#9CA3AF",
                      width: 15,
                      height: 18,
                    })}
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mt-2 font-light">{contentSnippet}</p>

              {/* the originalthread of originalthread */}
              {originalThread.isQuote && (
                <div
                  onClick={originalThreadclick}
                  className="bg-[#181818] rounded-lg overflow-hidden border-[.05rem] border-[#323232] py-4 px-4 m-2"
                >
                  <div className="flex items-start">
                    <Image
                      src={DummyUserIcon}
                      alt={quote.author || ""}
                      className="w-10 rounded-full object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <h3
                            onClick={quoteusernameclick}
                            className="text-base font-semibold text-slate-200 hover:underline"
                          >
                            {quote.author.username &&
                              "@" + quote.author.username}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {timeAgo(quote.createdAt)}
                          </p>
                        </div>
                        <div className="text-gray-400"></div>
                      </div>
                      <p className="text-gray-300 mt-2 font-light">
                        {quote.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Threadbutton
                id={id}
                commentsCount={commentsCount}
                upvotes={upvotes}
                reposts={reposts}
                isRepost={isRepost}
                originalThreadId={originalThread._id}
                isQuote={isQuote}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RepostCard;
