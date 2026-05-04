import { Link } from "react-router";
import { HiOutlineHome, HiOutlineExclamationCircle } from "react-icons/hi";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Minh họa số 404 */}
        <div className="relative">
          <h1 className="text-[12rem] font-extrabold text-blue-400 opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <HiOutlineExclamationCircle
              size={80}
              className="text-blue-400 mb-4"
            />
            <h2 className="text-2xl font-bold text-slate-800">
              Ối! Trang không tồn tại
            </h2>
          </div>
        </div>

        <p className="text-slate-500 mt-4 mb-8">
          Có vẻ như đường dẫn bạn đang truy cập đã bị thay đổi hoặc không còn
          tồn tại. Hãy quay lại trang chủ để tiếp tục học tập nhé!
        </p>

        {/* Nút quay lại trang chủ */}
        <Link
          to="/hiragana-syllable"
          className="inline-flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-400/30 active:scale-95"
        >
          <HiOutlineHome size={20} />
          Quay về trang chủ
        </Link>

        {/* Footer trang lỗi */}
        <div className="mt-12 text-sm text-slate-400">
          Học tiếng Nhật cùng chúng mình &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
