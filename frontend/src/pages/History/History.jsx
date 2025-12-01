import { useEffect } from 'react'
import { useQRStore } from '../../store/useQRStore'
import HistoryHeader from '../../components/QRHistory/HistoryHeader'
import HistoryList from '../../components/QRHistory/HistoryList'
import HistoryCard from '../../components/QRHistory/HistoryCard'
import EmptyState from '../../components/QRHistory/EmptyState'
import LoadingState from '../../components/QRHistory/LoadingState'
import ErrorState from '../../components/QRHistory/ErrorState'

const History = () => {
  const { qrHistory, getQRHistory, isLoading, error } = useQRStore()

  // Fetch history on load
  useEffect(() => {
    getQRHistory()
  }, [getQRHistory])

  // Debug console logs
  useEffect(() => {
    if (qrHistory.length > 0) {
      console.log('QR History:', qrHistory)
      console.log('First QR properties:', {
        id: qrHistory[0]?.id,
        imageUrl: qrHistory[0]?.imageUrl?.substring(0, 50),
        content: qrHistory[0]?.content,
        type: qrHistory[0]?.type
      })
    }
  }, [qrHistory])

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="space-y-6">
      <HistoryHeader count={qrHistory.length} />
      
      {qrHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrHistory.map((qr) => (
            <HistoryCard key={qr.id} qr={qr} />
          ))}
        </div>
      )}
    </div>
  )
}

export default History