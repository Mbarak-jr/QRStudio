import InputField from "../../UI/InputField";  // ✅ IMPORTANT — FIXED

const TextUrlForm = ({ formData, handleChange }) => {
  return (
    <InputField
      label={formData.type === "url" ? "URL *" : "Content *"}
      name="data"
      type="text"
      value={formData.data}
      onChange={handleChange}
      placeholder={
        formData.type === "url"
          ? "https://example.com"
          : "Enter your text content..."
      }
      required
    />
  );
};

export default TextUrlForm;
