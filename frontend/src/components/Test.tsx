"use client"

import { getProgressFromDay } from "@/lib/getter";
import { useState } from "react";

export default function Test() {
  const [inputDay, setInputDay] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const result = await getProgressFromDay(Number(inputDay));
      setProgress(result);
      setError(null);
    } catch (err) {
      setError("データの取得に失敗しました");
      setProgress(null);
    }
  };

  return (
    <div>
      <label>
        日付を入力してください：
        <input
          type="text"
          value={inputDay}
          onChange={(e) => setInputDay(e.target.value)}
        />
      </label>
      <button onClick={handleClick}>送信</button>

      {/* 結果表示 */}
      {progress !== null && (
        <p>進捗率: {progress.toFixed(2)}%</p>
      )}

      {/* エラー表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
