import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { useAccessToken } from "../hooks/custom";
import { protectedResources } from "../authConfig";

export const TextBox = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [trigger, setTrigger] = useState(false);
  const { getAccessToken } = useAccessToken();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        console.log(accessToken);
        setAccessToken(accessToken);
      }
    };
    fetchProtectedData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: protectedResources.apiTodoList.endpoint,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setResponseText(response.data.InputText);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [accessToken, trigger]);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ここでテキストを送信するための処理を追加
    try {
      const response = await axios.post(
        protectedResources.apiTodoList.endpoint,
        { text: inputText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data); // レスポンスデータをコンソールに出力する例
      toast.success("送信が完了しました");
    } catch (error) {
      console.error(error);
      toast.error("送信に失敗しました");
    }
    // テキストを送信後にフォームをリセットする
    setInputText("");
    setTrigger(!trigger);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        label="テキスト"
        variant="standard"
        value={inputText}
        onChange={handleChange}
        fullWidth
        sx={{ width: "50%", marginBottom: "3rem", height: "3rem" }}
      />
      <Button variant="contained" type="submit" sx={{ height: "3rem" }}>
        送信
      </Button>
      <Typography variant="h5" component="div">
        Last update: {responseText}
      </Typography>
    </form>
  );
};
