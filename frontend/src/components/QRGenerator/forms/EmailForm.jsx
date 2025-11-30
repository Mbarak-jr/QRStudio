import InputField from '../../UI/InputField'

const EmailForm = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <InputField
        label="Email Address *"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />
      <InputField
        label="Subject"
        name="subject"
        type="text"
        value={formData.subject || ''}
        onChange={handleChange}
        placeholder="Email subject"
      />
      <InputField
        label="Body"
        name="body"
        type="text"
        value={formData.body || ''}
        onChange={handleChange}
        placeholder="Email body content"
      />
    </div>
  )
}

export default EmailForm