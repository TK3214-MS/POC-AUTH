import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as sql from "mssql";

const config = {
  server: "b2csamplescenario-sql.database.windows.net",
  database: "b2csamplescenario-sql",
  authentication: {
    type: "azure-active-directory-msi-app-service",
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
  // user: "DevManager",
  // password: "Password!",
  // options: {
  //   encrypt: true,
  //   trustServerCertificate: false,
  // },
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (req.method === "GET") {
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query("SELECT TOP 1 * FROM dbo.SampleTable ORDER BY CreatedAt DESC");

      if (result.recordset && result.recordset.length > 0) {
        const latestData = result.recordset[0];

        context.res = {
          status: 200,
          body: latestData,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
      } else {
        context.res = {
          status: 404,
          body: { error: "データが見つかりませんでした。" },
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
      }
    } catch (error) {
      context.log.error("データの取得中にエラーが発生しました:", error);
      context.res = {
        status: 500,
        body: { error: "データの取得中にエラーが発生しました。" },
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
    }
  } else if (req.method === "POST") {
    try {
      const pool = await sql.connect(config);
      //   const body = JSON.parse(JSON.stringify(req.body).replace(/\\/g, ""));
      context.log.info(`request body is '${JSON.stringify(req.body)}'`);
      const text = req.body.text;
      if (!text) {
        context.res = {
          status: 400,
          body: { error: "リクエストボディにテキストがありません。" },
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
        return;
      }

      await pool
        .request()
        .input("InputText", sql.NVarChar, text)
        .query(
          "INSERT INTO dbo.SampleTable (InputText, CreatedAt) VALUES (@InputText, GETDATE())"
        );

      context.res = {
        status: 200,
        body: { message: "データが正常に挿入されました。" },
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
    } catch (error) {
      context.log.error("データの挿入中にエラーが発生しました:", error);

      context.res = {
        status: 500,
        body: { error: "データの挿入中にエラーが発生しました。" },
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
    }
  } else {
    context.res = {
      status: 400,
      body: { error: "サポートされていないHTTPメソッドです。" },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }
};

export default httpTrigger;
