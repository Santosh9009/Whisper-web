import { useState, useRef, useEffect } from "react";
import DummyUserIcon from "../../../public/assests/profile-picture.png"; // Fix path
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { createThread } from "@/lib/actions/thread.actions";
import { useSession } from "next-auth/react";
import { UploadComponent } from "../uiCompoents/uploadComponent";
import { X } from "lucide-react";

interface CreateThreadCardProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  authorId: string;
}

export const CreateThreadCard: React.FC<CreateThreadCardProps> = ({
  isOpen,
  onClose,
  username,
  authorId,
}) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<{ url: string; publicId: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const session = useSession();
  const [isClosing, setIsClosing] = useState(false); 

  // Resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";  
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;  
    }
  }, [content]);

  // Handle thread creation
  const handleCreateThread = async () => {
    if (content.trim() || images.length > 0) {
      const { success } = await createThread({
        author: authorId,
        content: content,
        photos: images,
      });

      if (success) {
        toast({
          title: "Success",
          description: "A new thread has been posted.",
        });
        setContent("");
        setImages([]); 
        handleCloseModal(); 
      } else {
        toast({
          title: "Failed",
          description: "Error posting the thread. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Empty Content",
        description: "Please provide some content or an image.",
        variant: "destructive",
      });
    }
  };

  const handleUploadSuccess = (uploadedFile: { secure_url: string; public_id: string }) => {
    const newImage = {
      url: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,
    };
    setImages([newImage]); 
    console.log('Uploaded image:', newImage);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-background")) {
      handleCloseModal(); 
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onClose(); 
      setIsClosing(false); 
    }, 300); 
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 modal-background h-screen"
      onClick={handleClickOutside}
    >
      <div
        className={`bg-[#181818] max-h-screen overflow-y-auto rounded-lg shadow-lg w-full max-w-lg border-[0.01rem] border-[#323232] flex flex-col h-screen md:h-auto transition-transform duration-300 ease-out ${
          isClosing ? "slide-out-down" : "slide-in-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <Image
              src={DummyUserIcon}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="text-lg font-semibold text-white hover:underline">
              @{username}
            </h2>
          </div>
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-white"
          >
            <X/>
          </button>
        </div>

        <div className="px-6 flex-grow overflow-y-auto">
          <textarea
            ref={textareaRef}
            className="w-full p-2 bg-[#181818] rounded-lg text-white focus:outline-none resize-none mb-4"
            placeholder="What's on your mind?"
            rows={3}
            minLength={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <UploadComponent onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="flex justify-end p-4 flex-shrink-0">
          <button
            onClick={handleCreateThread}
            className={`${
              !content && images.length < 1 ? "text-slate-600" : "text-white"
            } px-4 py-1 rounded-lg border-[.05rem] border-[#323232]`}
            disabled={!content && images.length < 1} 
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

