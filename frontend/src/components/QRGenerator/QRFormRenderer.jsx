import TextUrlForm from './forms/TextUrlForm'
import EmailForm from './forms/EmailForm'
import PhoneForm from './forms/PhoneForm'
import WifiForm from './forms/WifiForm'
import VCardForm from './forms/VCardForm'

const QRFormRenderer = ({ formData, handleChange }) => {
  const renderForm = () => {
    switch (formData.type) {
      case 'text':
      case 'url':
        return <TextUrlForm formData={formData} handleChange={handleChange} />
      
      case 'email':
        return <EmailForm formData={formData} handleChange={handleChange} />
      
      case 'phone':
        return <PhoneForm formData={formData} handleChange={handleChange} />
      
      case 'wifi':
        return <WifiForm formData={formData} handleChange={handleChange} />
      
      case 'vcard':
        return <VCardForm formData={formData} handleChange={handleChange} />
      
      default:
        return <TextUrlForm formData={formData} handleChange={handleChange} />
    }
  }

  return (
    <div className="space-y-6">
      {renderForm()}
    </div>
  )
}

export default QRFormRenderer