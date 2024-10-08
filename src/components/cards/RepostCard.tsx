// components/MetaThreadCard.tsx
"use client";
import Image from "next/image";
import { RepostIcon, ThreeDotIcon } from "../../../public/assests/Images";
import DummyUserIcon from "../../../public/assests/profile-picture.png";
import { timeAgo } from "@/helpers/CalculateTime";
import Threadbutton from "../uiCompoents/Threadbutton";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { photo } from "@/types/Thread";

interface ThreadCardProps {
  br?: boolean;
  id: any;
  author:{_id:string, avatarUrl:string,username:string};
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
  isQuote?: boolean;
  photos?: photo[];
}

const RepostCard: React.FC<ThreadCardProps> = ({
  br,
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
  photos,
}) => {
  const router = useRouter();
  const border = br===false ? br : true;
  const quote = originalThread.originalThread;
  const MAX_PHOTOS_DISPLAY = 3;

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
      {/* <Link href={`/thread/${id}`}> */}
      <div
        onClick={() => router.push(`/thread/${id}`)}
        className={`bg-[#181818] overflow-hidden ${
          border ? "border-b-[.05rem] border-[#323232]" : ""
        } py-4 px-8`}
      >
        <div className="flex items-start">
          <Image
          height={20}
          width={20}
            src={author.avatarUrl || DummyUserIcon}
            alt={author.username || ""}
            className="w-10 rounded-full object-cover"
          />
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleclick}
                  className="text-base font-semibold text-slate-200 hover:underline"
                >
                  {author.username && "@" + author.username}
                </button>
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

            {photos && photos.length > 0 && (
              <div className="mt-2">
                <div className="grid grid-cols-3 gap-2">
                  {photos.slice(0, MAX_PHOTOS_DISPLAY).map((photo, index) => (
                    <CldImage
                      key={photo.publicId}
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-auto rounded-md object-cover"
                      width={300}
                      height={200}
                    />
                  ))}
                </div>
                {photos.length > MAX_PHOTOS_DISPLAY && (
                  <button className="mt-2 text-blue-500 hover:underline">
                    View more ({photos.length - MAX_PHOTOS_DISPLAY})
                  </button>
                )}
              </div>
            )}

            {/* the originalthread of originalthread */}
            {originalThread.isQuote && (
              <div
                onClick={originalThreadclick}
                className="bg-[#181818] rounded-lg overflow-hidden border-[.05rem] border-[#323232] py-4 px-4 m-2"
              >
                <div className="flex items-start">
                  <Image
                  height={20}
                  width={20}
                    src={quote.author.avatarUrl || DummyUserIcon}
                    alt={quote.author || ""}
                    className="w-10 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={quoteusernameclick}
                          className="text-base font-semibold text-slate-200 hover:underline"
                        >
                          {quote.author.username && "@" + quote.author.username}
                        </button>
                        <p className="text-gray-400 text-sm">
                          {timeAgo(quote.createdAt)}
                        </p>
                      </div>
                      <div className="text-gray-400"></div>
                    </div>
                    <p className="text-gray-300 mt-2 font-light">
                      {quote.content}
                    </p>
                    {quote.photos &&
                      quote.photos.length > 0 && (
                        <div className="mt-2">
                          <div className="grid grid-cols-3 gap-2">
                            {quote.photos
                              .slice(0, MAX_PHOTOS_DISPLAY)
                              .map((photo: any, index: number) => (
                                <CldImage
                                  key={photo.publicId}
                                  src={photo.url}
                                  alt={`Photo ${index + 1}`}
                                  className="w-full h-auto rounded-md object-cover"
                                  width={300}
                                  height={200}
                                />
                              ))}
                          </div>
                          {quote.photos.length >
                            MAX_PHOTOS_DISPLAY && (
                            <button className="mt-2 text-blue-500 hover:underline">
                              View more (
                              {quote.photos.length -
                                MAX_PHOTOS_DISPLAY}
                              )
                            </button>
                          )}
                        </div>
                      )}
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
      {/* </Link> */}
    </div>
  );
};

export default RepostCard;
