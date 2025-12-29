import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputField = ({ type, placeholder, value, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={type === "password" ? (isPasswordShown ? "text" : "password") : type}
        placeholder={placeholder}
        className="input-field"
        value={value}          // ✅ Bind value from parent
        onChange={onChange}    // ✅ Bind onChange from parent
        required
      />
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown(prev => !prev)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? <Visibility /> : <VisibilityOff />}
        </i>
      )}
    </div>
  );
};

export default InputField;
