const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📄</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No QR codes yet
      </h3>
      <p className="text-gray-600">Generate your first QR code to see it here</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Generate QR Code
      </button>
    </div>
  )
}

export default EmptyState