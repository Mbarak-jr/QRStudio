import HistoryCard from './HistoryCard'

const HistoryList = ({ qrHistory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {qrHistory.map((qr) => (
        <HistoryCard key={qr.id} qr={qr} />
      ))}
    </div>
  )
}

export default HistoryList