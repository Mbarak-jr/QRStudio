import InputField from '../../UI/InputField'

const VCardForm = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name *"
          name="firstName"
          type="text"
          value={formData.firstName || ''}
          onChange={handleChange}
          placeholder="John"
          required
        />
        <InputField
          label="Last Name *"
          name="lastName"
          type="text"
          value={formData.lastName || ''}
          onChange={handleChange}
          placeholder="Doe"
          required
        />
      </div>

      <InputField
        label="Organization"
        name="organization"
        type="text"
        value={formData.organization || ''}
        onChange={handleChange}
        placeholder="Company Name"
      />

      <InputField
        label="Phone *"
        name="phone"
        type="tel"
        value={formData.phone || ''}
        onChange={handleChange}
        placeholder="+1234567890"
        required
      />

      <InputField
        label="Email *"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />

      <InputField
        label="Website"
        name="website"
        type="url"
        value={formData.website || ''}
        onChange={handleChange}
        placeholder="https://example.com"
      />

      <InputField
        label="Address"
        name="address"
        type="text"
        value={formData.address || ''}
        onChange={handleChange}
        placeholder="Street, City, Country"
      />

      <InputField
        label="Job Title"
        name="jobTitle"
        type="text"
        value={formData.jobTitle || ''}
        onChange={handleChange}
        placeholder="Software Engineer"
      />
    </div>
  )
}

export default VCardForm