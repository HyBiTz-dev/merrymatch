import { useState, useEffect } from "react";

function Toast(prop) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true); // เปิด Toast ขึ้นมาทุกครั้งที่ prop เปลี่ยน
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [prop]); // ให้ useEffect ทำงานเมื่อ prop เปลี่ยนแปลง

  if (!visible) {
    return null;
  }

  if (prop.success) {
    return (
      <div className="toast toast-bottom">
        <div className="alert alert-success">
          <span className="text-white">{prop.text}</span>
        </div>
      </div>
    );
  } else if (prop.info) {
    return (
      <div className="toast toast-bottom">
        <div className="alert alert-info">
          <span className="text-white">{prop.text}</span>
        </div>
      </div>
    );
  } else if (prop.error) {
    return (
      <div className="toast toast-bottom">
        <div className="alert alert-error">
          <span className="text-white">{prop.text}</span>
        </div>
      </div>
    );
  } else if (prop.warning) {
    return (
      <div className="toast toast-bottom">
        <div className="alert alert-warning">
          <span className="text-white">{prop.text}</span>
        </div>
      </div>
    );
  }
}

export default Toast;
