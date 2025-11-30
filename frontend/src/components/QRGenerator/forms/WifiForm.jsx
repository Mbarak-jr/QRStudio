import InputField from '../../UI/InputField'

const WifiForm = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <InputField
        label="SSID (Network Name) *"
        name="ssid"
        type="text"
        value={formData.ssid || ''}
        onChange={handleChange}
        placeholder="MyWiFiNetwork"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Encryption Type *
        </label>
        <select
          name="encryption"
          value={formData.encryption || 'WPA'}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
          required
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Encryption</option>
        </select>
      </div>

      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password || ''}
        onChange={handleChange}
        placeholder="WiFi password"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="hidden"
          id="hidden"
          checked={formData.hidden || false}
          onChange={(e) => handleChange({
            target: { name: 'hidden', value: e.target.checked }
          })}
          className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
        />
        <label htmlFor="hidden" className="text-sm text-gray-300">
          Hidden network
        </label>
      </div>
    </div>
  )
}

export default WifiForm