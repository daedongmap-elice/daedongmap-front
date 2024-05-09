import { Comment, CommentPost } from "@/components/review/index";
import { useEffect, useState } from "react";
import axios from "axios";

// TODO: CommentModal에서도 각 댓글에서 로그인userID와 댓글userID가 일치할 경우에만 EditButton 표시

interface CommentModalProps {
  handleCommentCount: (count: number) => void;
  loginUserId: number;
}

interface CommentModalResponse {
  id: number;
  user: {
    id: number;
    nickName: string;
    email: string;
    profileImagePath: string;
  };
  content: string;
  createdAt: string;
}

const CommentModal = ({
  handleCommentCount,
  loginUserId,
}: CommentModalProps) => {
  const [data, setData] = useState<CommentModalResponse[]>([]);
  const currentReviewId = window.location.hash.substring(1);
  // 부모 컴포넌트에서 자식의 DOM요소 접근 시는 useRef 대신 forwardRef를 사용해 접근
  // const lastCommentRef = forwardRef<HTMLDivElement>((div) =>
  //   div.scrollIntoView()
  // );

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://35.232.243.53:8080/api/comments/reviews/${currentReviewId}`
      );
      setData(response.data);
      handleCommentCount(response.data.length);
    } catch (error) {
      console.error("댓글창 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
    // lastCommentRef.scrollIntoView();
  }, []);

  return (
    <>
      <div className="modal-box h-5/6 w-full rounded-b-none pl-4">
        <h3 className="text-center text-base font-bold">댓글</h3>
        <div className="h-5/6 overflow-auto">
          {data.map((comment, i) =>
            data.length === i + 1 ? (
              <Comment
                key={`comment${i}`}
                loginUserId={loginUserId}
                commentId={comment.id}
                userId={comment.user.id}
                profileImagePath={comment.user.profileImagePath}
                nickName={comment.user.nickName}
                content={comment.content}
                createdAt={comment.createdAt}
                getData={getData}
                // ref={lastCommentRef}
              />
            ) : (
              <Comment
                key={`comment${i}`}
                loginUserId={loginUserId}
                commentId={comment.id}
                userId={comment.user.id}
                profileImagePath={comment.user.profileImagePath}
                nickName={comment.user.nickName}
                content={comment.content}
                createdAt={comment.createdAt}
                getData={getData}
              />
            )
          )}
        </div>
        <CommentPost
          loginUserId={loginUserId}
          reviewId={currentReviewId}
          onPostSuccess={getData}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
};

export default CommentModal;
