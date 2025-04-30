import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

// Format date to Persian format
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // You can implement Persian date formatting here
    // For now, just returning a simple format
    return date.toLocaleDateString("fa-IR");
  } catch {
    return "تاریخ نامشخص";
  }
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="no-comments text-center py-4">
        <p className="text-muted">
          هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که دیدگاه می‌نویسید!
        </p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item mb-4 p-4 border-bottom">
          <div className="comment-header d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <div className="avatar me-3">
                {comment.author.avatar ? (
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                ) : (
                  <div
                    className="avatar-placeholder d-flex align-items-center justify-content-center bg-gray-200 rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <span>{comment.author.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div>
                <h5 className="comment-author mb-0">{comment.author.name}</h5>
                <p className="comment-date text-sm text-muted mt-1">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            </div>

            <div className="comment-rating d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="star mx-1">
                  {star <= comment.rating ? (
                    <FaStar size={16} className="text-yellow-500" />
                  ) : (
                    <FaRegStar size={16} className="text-gray-300" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="comment-content">
            <p className="mb-0">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
