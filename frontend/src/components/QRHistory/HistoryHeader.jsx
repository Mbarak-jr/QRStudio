const HistoryHeader = ({ count }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code History</h1>
      <p className="text-gray-600">Your previously generated QR codes</p>
      
      {count > 0 && (
        <div className="mt-2 text-sm text-gray-500 bg-gray-100 p-2 rounded inline-block">
          Found {count} QR {count === 1 ? 'code' : 'codes'}
        </div>
      )}
    </div>
  )
}

export default HistoryHeader