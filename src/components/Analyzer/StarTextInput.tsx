import React, { ChangeEvent, KeyboardEvent } from "react";

type StarTextInputProps = {
  patp: string,
  onChange: (value: string) => void,
  error: boolean,
  execute: () => void,
};

const StarTextInput: React.FC<StarTextInputProps> = (props) => {
  const { patp, onChange, error, execute } = props;

  return (
    <div
      style={{
        height: 110,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        className="patp-input"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value.toLowerCase())
        }
        value={patp}
        placeholder="Enter a star"
        autoCorrect="off"
        autoComplete="off"
        type="text"
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            execute();
          }
        }}
      />

      <div style={{ height: 20 }}>
        {error && (
          <div
            style={{
              color: "red",
              fontSize: 14,
            }}
          >
            Not a valid star!
          </div>
        )}
      </div>
    </div>
  );
};

export default StarTextInput;
