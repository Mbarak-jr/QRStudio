import InputField from '../../UI/InputField'

const PhoneForm = ({ formData, handleChange }) => {
  return (
    <InputField
      label="Phone Number *"
      name="phone"
      type="tel"
      value={formData.phone || ''}
      onChange={handleChange}
      placeholder="+1234567890"
      required
    />
  )
}

export default PhoneForm