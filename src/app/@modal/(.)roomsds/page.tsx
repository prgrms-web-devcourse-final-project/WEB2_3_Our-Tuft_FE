export default function Modal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2>모달이요요요</h2>
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
          닫기
        </button>
      </div>
    </div>
  );
}
